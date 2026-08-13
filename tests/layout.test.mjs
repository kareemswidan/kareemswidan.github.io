// Layout tests that run in a real browser.
//
// portfolio.test.mjs can only assert that a CSS rule is present in the file.
// That is not the same as the box being laid out correctly — the hero portrait
// bug shipped with every rule "correct" in isolation. These tests measure the
// rendered result instead.
//
// Needs Chromium: npm install && npx playwright install chromium
// Run with: npm run test:layout

import test from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const home = new URL("../index.html", import.meta.url).href;
let browser;

test.before(async () => { browser = await chromium.launch(); });
test.after(async () => { await browser?.close(); });

async function open(width = 1280, height = 860) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(home, { waitUntil: "load" });
  // transitions are frame-driven and add nothing but flake to a measurement
  await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; }" });
  return page;
}

test("hero portrait is laid out to its 4:4.5 box, not its intrinsic height", async () => {
  const page = await open();
  const img = await page.locator(".portraitCard img").boundingBox();
  const card = await page.locator(".portraitCard").boundingBox();
  const expected = img.width * 4.5 / 4;

  assert.ok(Math.abs(img.height - expected) < 2,
    `portrait should be ${expected.toFixed(0)}px tall for a ${img.width.toFixed(0)}px width, measured ${img.height.toFixed(0)}px`);
  // the bug that shipped: 410x1402 inside a card 1524px tall
  assert.ok(card.height < 900, `portrait card grew to ${card.height.toFixed(0)}px`);
  await page.close();
});

test("no image is sized by its width/height attributes", async () => {
  const page = await open();
  const offenders = await page.evaluate(() => {
    const bad = [];
    for (const img of document.querySelectorAll("img[width][height]")) {
      const box = img.getBoundingClientRect();
      const attrW = Number(img.getAttribute("width"));
      const attrH = Number(img.getAttribute("height"));
      // rendered narrower than intrinsic but still at intrinsic height means the
      // height presentational hint outlived the author rules and aspect-ratio was dropped
      if (box.width < attrW - 1 && Math.abs(box.height - attrH) < 1) {
        bad.push((img.getAttribute("src") || "?") + ` ${box.width.toFixed(0)}x${box.height.toFixed(0)}`);
      }
    }
    return bad;
  });
  assert.deepEqual(offenders, [], "images rendering at their intrinsic height");
  await page.close();
});

test("nothing is laid out past the right edge of the viewport", async () => {
  for (const width of [1440, 1280, 1024, 768, 390]) {
    const page = await open(width, 900);
    const offenders = await page.evaluate(() => {
      // body carries overflow-x:hidden as a safety net. It hides mistakes rather
      // than preventing them — the "Remote ready" badge sat 10px outside the
      // viewport for months and was silently cut off — so it must not count as
      // deliberate clipping here. A marquee inside its own overflow:hidden rail does.
      const clippedByDesign = (el) => {
        for (let n = el.parentElement; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
          const ox = getComputedStyle(n).overflowX;
          if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return true;
        }
        return false;
      };
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) continue;
        if (getComputedStyle(el).position === "fixed") continue; // decoration, cannot be scrolled to
        if (box.right > window.innerWidth + 1 && !clippedByDesign(el)) {
          const cls = typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : "";
          out.push(`${el.tagName.toLowerCase()}${cls} right=${box.right.toFixed(0)}`);
        }
      }
      return out;
    });
    assert.deepEqual(offenders, [], `content past the right edge at ${width}px`);
    await page.close();
  }
});

test("the skip link is the first tab stop and moves into view when focused", async () => {
  const page = await open();
  await page.keyboard.press("Tab");

  const focused = await page.evaluate(() => document.activeElement?.className);
  assert.equal(focused, "skipLink", "first tab stop should be the skip link");

  const box = await page.locator(".skipLink").boundingBox();
  assert.ok(box.y >= 0 && box.y < 120, `skip link should slide into view, measured y=${box.y}`);

  // it must sit above the sticky header, not behind it
  const stacking = await page.evaluate(() => ({
    skip: Number(getComputedStyle(document.querySelector(".skipLink")).zIndex),
    header: Number(getComputedStyle(document.querySelector(".siteHeader")).zIndex)
  }));
  assert.ok(stacking.skip > stacking.header, "skip link must paint above the header");

  // and the target has to accept focus or the browser scrolls without moving it
  const tabindex = await page.locator("#top").getAttribute("tabindex");
  assert.equal(tabindex, "-1");
  await page.close();
});

test("every case study renders, and its hero has the pixels a retina screen asks for", async () => {
  const slugs = ["smartstay", "velora", "nexora", "lexiguard", "dozo", "electrical"];
  for (const slug of slugs) {
    // deviceScaleFactor 2 so srcset resolves the way it would on a real laptop.
    // The heroes used to be ~1425px sources in a 1280px box — soft on every
    // retina display, which is what the whole re-shoot was about.
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const consoleErrors = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 120)); });

    // A bare "Failed to load resource" tells you nothing about which resource,
    // and this suite spent three CI runs failing on a different case study each
    // time. Record the URL, and hold only our own files to the assertion: the
    // page asks Google Fonts for two stylesheets, that host throttles CI
    // runners, and the text still renders through font-display: swap.
    const ourFailures = [];
    const theirFailures = [];
    const record = (url, why) => {
      (url.startsWith("file://") ? ourFailures : theirFailures).push(`${why} ${url}`);
    };
    page.on("response", (r) => { if (r.status() >= 400) record(r.url(), r.status()); });
    page.on("requestfailed", (r) => record(r.url(), (r.failure()?.errorText) || "failed"));
    await page.goto(new URL(`../case-studies/${slug}/index.html`, import.meta.url).href, { waitUntil: "load" });
    await page.waitForSelector(".caseHero", { timeout: 15000 });

    // The gallery figures are loading="lazy" and sit below the fold, so they
    // were never fetched here: deleting one of them still passed this test.
    // Force them in and wait, or the galleries go unchecked.
    await page.evaluate(() => {
      document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; });
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForFunction(
      () => [...document.querySelectorAll("img")].every((i) => i.complete),
      null, { timeout: 15000 }
    );

    const r = await page.evaluate(() => {
      const hero = document.querySelector(".heroMedia img");
      const box = hero.getBoundingClientRect();
      return {
        h1: document.querySelectorAll("h1").length,
        chose: hero.currentSrc.split("/").pop(),
        needed: Math.round(box.width * devicePixelRatio),
        broken: [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).length,
        noAlt: [...document.querySelectorAll("img")].filter((i) => !i.getAttribute("alt")).length,
      };
    });

    assert.equal(r.h1, 1, `${slug}: expected exactly one h1`);
    assert.equal(r.broken, 0, `${slug}: broken images`);
    assert.equal(r.noAlt, 0, `${slug}: images without alt text`);
    assert.deepEqual(ourFailures, [], `${slug}: this repo failed to serve a file`);
    // console errors that are not a third-party fetch we already accounted for
    const ours = theirFailures.length ? consoleErrors.filter((m) => !/Failed to load resource/.test(m)) : consoleErrors;
    assert.deepEqual(ours, [], `${slug}: console errors (third-party: ${theirFailures.join("; ") || "none"})`);

    const picked = Number((r.chose.match(/-(\d+)\.webp$/) || [])[1] || 0);
    assert.ok(picked >= r.needed * 0.95,
      `${slug}: hero served ${picked}px for a screen needing ${r.needed}px (${r.chose})`);
    await page.close();
  }
});

test("submitting the contact form offers both a WhatsApp and an email route", async () => {
  const page = await open(1280, 900);
  await page.fill("#contactForm [name=name]", "Recruiter Example");
  await page.fill("#contactForm [name=email]", "hr@example.com");
  await page.fill("#contactForm [name=message]", "Full-Stack role, remote.");
  await page.click("#contactForm .contactSubmit");

  const protocols = await page.locator("#contactStatus a").evaluateAll(list => list.map(a => a.protocol).sort());
  assert.deepEqual(protocols, ["https:", "mailto:"],
    "a visitor without WhatsApp must still have a way through");

  // the handoff must never navigate the page away and strand the visitor
  assert.ok(page.url().startsWith("file:"), "submitting should not navigate");
  await page.close();
});
