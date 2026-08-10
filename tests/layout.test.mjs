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
