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
    stat(new URL("media/kareem-swidan-story.mp4", root))
  ]);
  await access(new URL("media/kareem-swidan-story-poster.jpg", root));
  await access(new URL("media/kareem-swidan-story.en.vtt", root));
  assert.ok(video.size > 1_000_000, "portfolio story should be a real encoded video");
  assert.match(home, /id="storyDialog"/);
  assert.match(home, /id="about"/);
  assert.match(home, /class="credibilityRail"/);
  assert.match(home, /class="hireFacts"/);
  assert.match(home, /data-count="33"/);
  assert.match(app, /projectOutcomes/);
  assert.match(app, /featuredProject/);
  assert.match(app, /setupProjectMotion/);
  assert.match(styles, /prefers-reduced-motion/);
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
  await access(new URL("kareem-swidan-v2.jpeg", root));
  assert.match(home, /Kareem_Swidan_Full_Stack_CV\.pdf/);
  assert.match(home, /kareem-swidan-v2\.jpeg/);
  assert.match(home, /linkedin\.com\/in\/kareem-swidan-21b064263/);
  assert.match(home, /github\.com\/kareemswidan/);
  assert.match(home, /instagram\.com\/kareem_swidan2002/);
  assert.match(home, /wa\.me\/972598934925/);
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

test("portfolio publishes professional proof without exposing recommender contact data", async () => {
  const [home, app] = await Promise.all([read("index.html"), read("app.js")]);
  assert.match(home, /id="proof"/);
  assert.match(home, /Dr\. Abdelrafe Elzamly/);
  assert.match(app, /33 automated checks passing/);
  assert.match(app, /نجاح 33 اختبارًا آليًا/);
  assert.doesNotMatch(home + app, /\+970\s*59\s*568\s*7828/);
  assert.doesNotMatch(home + app, /abdelrafe\.elzamly@alaqsa\.edu\.ps/i);
});

test("portfolio exposes crawlable SEO metadata and current Cloudflare deployments", async () => {
  const [home, app, studies, electrical, robots, sitemap, manifest] = await Promise.all([
    read("index.html"),
    read("app.js"),
    read("case-study.js"),
    read("electrical.html"),
    read("robots.txt"),
    read("sitemap.xml"),
    read("manifest.webmanifest")
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
});
