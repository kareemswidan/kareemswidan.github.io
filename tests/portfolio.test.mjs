import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const slugs = ["smartstay", "velora", "nexora", "lexiguard", "dozo", "electrical"];

test("portfolio links every project to an independent case study", async () => {
  const [home, app] = await Promise.all([read("index.html"), read("app.js")]);
  assert.match(home, /case-card\.css/);
  assert.match(app, /caseStudySlugs/);
  assert.match(app, /const displayOrder=\[0,3,1,2,4,5\]/);
  assert.match(app, /case-studies\/\$\{slug\}\//);
  for (const slug of slugs) {
    const page = "case-studies/" + slug + "/index.html";
    await access(new URL(page, root));
    assert.match(await read(page), new RegExp('data-project="' + slug + '"'));
  }
});

test("world-class upgrade ships all eight portfolio improvements", async () => {
  const [home, app, styles, video] = await Promise.all([
    read("index.html"),
    read("app.js"),
    read("style.css"),
    stat(new URL("media/kareem-swidan-showreel-v6.mp4", root))
  ]);
  await access(new URL("media/kareem-swidan-showreel-v6-poster.jpg", root));
  assert.ok(video.size > 1_000_000, "portfolio story should be a real encoded video");
  assert.match(home, /id="storyDialog"/);
  // Arabic is burned into the frame; a same-language <track> would double every line
  assert.doesNotMatch(home, /<track[^>]*srclang="ar"/);
  assert.match(home, /<b>1080p<\/b>/);
  // the superseded cut must not linger next to the one in use
  await assert.rejects(access(new URL("media/kareem-swidan-showreel-v5.mp4", root)));
  assert.match(home, /id="about"/);
  assert.match(home, /class="credibilityRail"/);
  assert.match(home, /class="hireFacts"/);
  assert.match(home, /data-count="24"/);
  assert.match(app, /projectOutcomes/);
  assert.match(app, /featuredProject/);
  assert.match(app, /setupProjectMotion/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /\.contactSection\s*\{[^}]*margin-block:\s*96px\s+95px/);
});

test("case studies include the complete engineering evidence model", async () => {
  const source = await read("case-study.js");
  for (const slug of slugs) assert.match(source, new RegExp("^  " + slug + ": \\{", "m"));
  for (const section of ["problem", "roleText", "stack", "architecture", "challenges", "evidence", "quality"]) {
    assert.match(source, new RegExp("\\b" + section + ":"));
  }
  assert.match(source, /portfolioLanguage/);
  assert.match(source, /portfolioTheme/);
  assert.match(source, /Open full-stack lab/);
});

test("CV, portrait and public contact destinations remain available", async () => {
  const home = await read("index.html");
  await access(new URL("Kareem_Swidan_Full_Stack_CV.pdf", root));
  await access(new URL("Kareem_Swidan_ATS_CV.pdf", root));
  await access(new URL("kareem-swidan-v2.webp", root));
  assert.match(home, /Kareem_Swidan_Full_Stack_CV\.pdf/);
  assert.match(home, /kareem-swidan-v2\.webp/);
  assert.match(home, /fetchpriority="high"/);
  assert.match(home, /linkedin\.com\/in\/kareem-swidan-21b064263/);
  assert.match(home, /github\.com\/kareemswidan/);
  assert.match(home, /mailto:kareemswidan11@gmail\.com/);
  assert.match(home, /bi-envelope/);
  assert.match(home, /class="hireEmail"/);
  assert.match(home, />kareemswidan11@gmail\.com</);
  assert.match(home, /class="formSocials"/);
  assert.equal((home.match(/class="formSocials"[\s\S]*?<\/div>/g) || []).length, 1);
  assert.doesNotMatch(home, /bi-instagram/);
  assert.match(home, /wa\.me\/972598934925/);
  assert.doesNotMatch(home, /01 \/ 06/);
});

test("all six projects use optimized original device mockups", async () => {
  const app = await read("app.js");
  for (const slug of slugs) {
    const asset = `media/project-mockups/${slug}-mockup.webp`;
    await access(new URL(asset, root));
    assert.match(app, new RegExp(asset.replace(/[/.]/g, "\\$&")));
  }
  assert.equal((app.match(/width="1600" height="900"/g) || []).length, 1);
});

test("portfolio keeps bilingual, theme and motion controls", async () => {
  const [home, app, styles] = await Promise.all([read("index.html"), read("app.js"), read("style.css")]);
  assert.match(home, /id="languageToggle"/);
  assert.match(home, /id="themeToggle"/);
  assert.match(app, /portfolioLanguage/);
  assert.match(app, /portfolioTheme/);
  assert.match(app, /IntersectionObserver/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("interactive portfolio layer includes the eight requested premium upgrades", async () => {
  const [home, app, styles] = await Promise.all([read("index.html"), read("app.js"), read("style.css")]);

  assert.match(home, /class="projectFilters"/);
  assert.equal((home.match(/data-project-filter=/g) || []).length, 4);
  assert.match(app, /projectCategories/);
  assert.match(app, /applyProjectFilter/);

  assert.match(home, /id="contactForm"/);
  assert.match(home, /name="name"/);
  assert.match(home, /name="email"/);
  assert.match(home, /name="message"/);
  assert.match(home, /<span data-i18n="contact\.send">Send message<\/span>/);
  assert.match(home, /bi-send/);
  assert.doesNotMatch(home, /Continue in WhatsApp/);
  assert.match(app, /setupContactForm/);
  assert.match(app, /wa\.me\/972598934925\?text=/);

  assert.match(home, /class="techRail"/);
  assert.match(styles, /@keyframes techRail/);
  assert.equal((home.match(/class="expertiseGrid"/g) || []).length, 1);
  assert.equal((home.match(/expertise\.(?:frontend|backend|data|delivery|cloud|quality)Title/g) || []).length, 6);

  assert.match(home, /data-count="6"/);
  assert.match(home, /data-count="24"/);
  assert.match(app, /animateProofCounters/);
  assert.match(styles, /\.projectCard:focus-within/);

  assert.doesNotMatch(home, /class="portraitSocialDock"/);
  assert.match(app, /setupNavigationSpy/);
  assert.match(app, /aria-current/);
  assert.match(styles, /\.projectsGrid\.isFiltered \.featuredProject:first-child \.projectMedia/);
  assert.doesNotMatch(home, /class="emailLink"/);
  assert.doesNotMatch(home, />Download CV</);

  for (const key of ["projects.filterAll", "expertise.cloudTitle", "contact.formTitle"]) {
    assert.ok((app.match(new RegExp(key.replace(".", "\\."), "g")) || []).length >= 2, `${key} should exist in both languages`);
  }
});

test("portfolio publishes professional proof without exposing recommender contact data", async () => {
  const [home, app] = await Promise.all([read("index.html"), read("app.js")]);
  assert.match(home, /id="proof"/);
  assert.match(home, /Dr\. Abdelrafe Elzamly/);
  assert.match(app, /24 automated checks passing/);
  assert.match(app, /نجاح 24 اختبارًا آليًا/);
  assert.doesNotMatch(home + app, /\+970\s*59\s*568\s*7828/);
  assert.doesNotMatch(home + app, /abdelrafe\.elzamly@alaqsa\.edu\.ps/i);
});

test("portfolio exposes crawlable SEO metadata and current Cloudflare deployments", async () => {
  const [home, app, studies, electrical, robots, sitemap, manifest, readme] = await Promise.all([
    read("index.html"),
    read("app.js"),
    read("case-study.js"),
    read("electrical.html"),
    read("robots.txt"),
    read("sitemap.xml"),
    read("manifest.webmanifest"),
    read("README.md")
  ]);
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /"@type": "ProfilePage"/);
  assert.match(app, /smartstay-palestine\.kareemswidan11\.workers\.dev/);
  assert.match(app, /kareem-product-suite\.kareemswidan11\.workers\.dev\/velora/);
  assert.match(app, /kareem-product-suite\.kareemswidan11\.workers\.dev\/nexora/);
  assert.match(app, /kareem-product-suite\.kareemswidan11\.workers\.dev\/lexiguard/);
  assert.doesNotMatch(app + studies + electrical, /chatgpt\.site/);
  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, /case-studies\/lexiguard/);
  assert.match(manifest, /Kareem Swidan/);
  assert.match(home, /<link rel="canonical" href="https:\/\/kareemswidan\.github\.io\/">/);
  assert.doesNotMatch(home + robots + sitemap, /github\.io\/kareem-swidan-portfolio/);
  // the CI badge must track the repo that actually builds the site; pointed at
  // kareem-swidan-portfolio the workflow does not exist there and it rendered empty
  assert.match(readme, /!\[CI\]\(https:\/\/github\.com\/kareemswidan\/kareemswidan\.github\.io\/actions\/workflows\/ci\.yml\/badge\.svg\)/);
  assert.doesNotMatch(readme, /kareem-swidan-portfolio\/actions/);
});

test("intrinsic size attributes cannot override the CSS box of an image", async () => {
  const [home, styles] = await Promise.all([read("index.html"), read("style.css")]);

  // width/height attributes are kept for CLS, but the browser maps them to
  // presentational hints. Without height:auto the height hint outlives every
  // author rule that only sets width, aspect-ratio is dropped, and the image
  // renders at its full intrinsic height.
  const sized = home.match(/<img[^>]*\bheight="\d+"[^>]*>/g) || [];
  assert.ok(sized.length > 0, "portrait should keep its intrinsic size attributes");
  for (const tag of sized) assert.match(tag, /\bwidth="\d+"/, "a height attribute needs its width partner");

  assert.match(styles, /^img \{[^}]*height: auto[^}]*\}/m);
  assert.match(styles, /^\.portraitCard img \{[^}]*height: auto[^}]*\}/m);
  assert.match(styles, /^\.portraitCard img \{[^}]*aspect-ratio: 4 \/ 4\.5[^}]*\}/m);
});

test("contact form reaches Kareem without depending on WhatsApp", async () => {
  const app = await read("app.js");
  assert.match(app, /mailto:kareemswidan11@gmail\.com\?subject=/);
  assert.match(app, /wa\.me\/972598934925\?text=/);
  // the WhatsApp handoff must never replace the page and strand the visitor
  assert.doesNotMatch(app, /window\.location\.href=whatsappUrl/);
  for (const key of ["contact.viaWhatsapp", "contact.viaEmail", "contact.mailSubject"]) {
    assert.equal((app.match(new RegExp(key.replace(".", "\\."), "g")) || []).length, 3, key + " needs both languages plus its use");
  }
});

test("no oversized or orphaned assets ship to production", async () => {
  const og = await stat(new URL("og.jpg", root));
  assert.ok(og.size < 300_000, "social card should stay under 300KB, got " + Math.round(og.size / 1024) + "KB");
  const home = await read("index.html");
  assert.match(home, /og\.jpg/);
  assert.doesNotMatch(home, /og\.png/);
  for (const gone of ["og.png", "kareem-swidan-v2.jpeg", "hero-fullstack-v2.b64", "media/kareem-swidan-showreel-v3.mp4", "media/kareem-swidan-story.mp4"]) {
    await assert.rejects(access(new URL(gone, root)), gone + " is unreferenced and should not be published");
  }
});

test("every published page and document is reachable", async () => {
  const [home, app, cv, sitemap, styles] = await Promise.all([
    read("index.html"), read("app.js"), read("cv.html"), read("sitemap.xml"), read("style.css")
  ]);

  // keyboard users hit the whole nav before the content; the target needs tabindex
  // or the browser scrolls without moving focus
  assert.match(home, /class="skipLink" href="#top"/);
  assert.match(home, /<main id="top" tabindex="-1">/);
  assert.match(styles, /\.skipLink:focus \{[^}]*top: 12px/);

  // cv.html and the ATS CV shipped but nothing on the site linked to them
  assert.match(home, /href="cv\.html"/);
  assert.match(home, /href="Kareem_Swidan_ATS_CV\.pdf"/);
  assert.match(sitemap, /<loc>https:\/\/kareemswidan\.github\.io\/cv\.html<\/loc>/);

  // cv.html was a dead end with no metadata and no way back
  assert.match(cv, /<link rel="canonical" href="https:\/\/kareemswidan\.github\.io\/cv\.html">/);
  assert.match(cv, /<meta name="description"/);
  assert.match(cv, /href="\.\/"/);
  assert.match(cv, /href="Kareem_Swidan_Full_Stack_CV\.pdf"/);
  assert.match(cv, /href="Kareem_Swidan_ATS_CV\.pdf"/);

  for (const key of ["nav.skip", "footer.cvWeb", "footer.cvAts"]) {
    assert.equal((app.match(new RegExp('"' + key.replace(".", "\\.") + '"', "g")) || []).length, 2, key + " needs both languages");
  }
});

test("the published check count is the number of checks that actually run", async () => {
  // "33 automated checks" was a hand-tallied cross-project sum. Nobody could
  // reproduce it from this repo, in the one section that asks to be verified.
  const [app, home, suite, layout] = await Promise.all([
    read("app.js"), read("index.html"),
    read("tests/portfolio.test.mjs"), read("tests/layout.test.mjs")
  ]);
  const count = (source) => (source.match(/^test\(/gm) || []).length;
  const content = count(suite);
  const browser = count(layout);
  const total = content + browser;

  assert.match(home, new RegExp('data-count="' + total + '">' + total + '<'));
  assert.match(app, new RegExp('"' + total + ' automated checks passing"'));
  assert.match(app, new RegExp("نجاح " + total + " اختبارًا آليًا"));
  assert.match(app, new RegExp('"' + content + " content and metadata checks plus " + browser + " browser layout checks"));
  assert.match(app, new RegExp('"' + content + " اختبار محتوى وبيانات وصفية و" + browser + " اختبارات تخطيط"));
});

test("Arabic leads its own font stack instead of falling through Manrope", async () => {
  const styles = await read("style.css");
  // Manrope carries no Arabic glyphs, so every Arabic glyph was arriving by
  // fallback. In RTL the Arabic face has to be the one that is asked for.
  assert.match(styles, /\[dir="rtl"\] body \{[^}]*font-family: "IBM Plex Sans Arabic", Manrope/);
});

test("footer links keep a touch-sized hit area on phones", async () => {
  const styles = await read("style.css");
  // 9px footer text gave the CV and back-to-top links a 15px tall target
  const mobile = styles.slice(styles.indexOf("@media (max-width: 560px)"));
  assert.match(mobile, /footer a \{[^}]*min-height: 44px/);
});

test("a sent contact form puts the visitor on the send action", async () => {
  const app = await read("app.js");
  // the prefilled links used to append silently below the fold
  assert.match(app, /whatsappLink\.focus\(\)/);
  assert.match(app, /whatsappLink\.scrollIntoView/);
  assert.match(app, /prefers-reduced-motion: reduce/);
  // and it still must not depend on WhatsApp being installed
  assert.match(app, /mailLink/);
});

test("every project states its evidence as a count somebody can reproduce", async () => {
  // DOZO used to read "Auth, sessions and persistence verified" while its repo
  // ran no tests at all. A word cannot be checked; a ratio can.
  const app = await read("app.js");
  const claims = [...app.matchAll(/title:"([^"]+)"[\s\S]{0,1500}?evidence:\{en:"([^"]*)",ar:"([^"]*)"/g)];
  assert.equal(claims.length, 6, "every project card needs an evidence claim");
  for (const [, title, en, ar] of claims) {
    assert.match(en, /^\d+\/\d+ /, title + " must lead with a count in English");
    assert.match(ar, /\d+\/\d+/, title + " must carry the same count in Arabic");
  }
});
