import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const slugs = ["smartstay", "velora", "nexora", "lexiguard", "dozo", "electrical"];

test("portfolio links every project to an independent case study", async () => {
  const [home, app] = await Promise.all([read("index.html"), read("app.js")]);
  assert.match(home, /case-card\.css/);
  assert.match(app, /caseStudySlugs/);
  assert.match(app, /case-studies\/\$\{caseStudySlugs\[index\]\}/);
  for (const slug of slugs) {
    const page = "case-studies/" + slug + "/index.html";
    await access(new URL(page, root));
    assert.match(await read(page), new RegExp('data-project="' + slug + '"'));
  }
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

test("CV and public contact destinations remain available", async () => {
  const home = await read("index.html");
  await access(new URL("Kareem_Swidan_Full_Stack_CV.pdf", root));
  assert.match(home, /Kareem_Swidan_Full_Stack_CV\.pdf/);
  assert.match(home, /linkedin\.com\/in\/kareem-swidan-21b064263/);
  assert.match(home, /github\.com\/kareemswidan/);
});
