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
    stat(new URL("media/kareem-swidan-showreel-v3.mp4", root))
  ]);
  await access(new URL("media/kareem-swidan-showreel-v3-poster.jpg", root));
  await access(new URL("media/kareem-swidan-showreel-v3.ar.vtt", root));
  assert.ok(video.size > 1_000_000, "portfolio story should be a real encoded video");
  assert.match(home, /id="storyDialog"/);
  assert.match(home, /srclang="ar"/);
  assert.match(home, /1080p · 30fps/);
  assert.match(home, /id="about"/);
  assert.match(home, /class="credibilityRail"/);
  assert.match(home, /class="hireFacts"/);
  assert.match(home, /data-count="33"/);
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
  await access(new URL("kareem-swidan-v2.jpeg", root));
  assert.match(home, /Kareem_Swidan_Full_Stack_CV\.pdf/);
  assert.match(home, /kareem-swidan-v2\.jpeg/);
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
  assert.match(home, /data-count="33"/);
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
  assert.match(home, /<link rel="canonical" href="https:\/\/kareemswidan\.github\.io\/">/);
  assert.doesNotMatch(home + robots + sitemap, /github\.io\/kareem-swidan-portfolio/);
});
