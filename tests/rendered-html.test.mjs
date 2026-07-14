import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the AI engineer portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Tsubasa&#x27;s Portfolio \| AI Engineer \/ FDE/i);
  assert.match(html, /まだ言葉になっていない/);
  assert.match(html, /AIで使われる仕組みに変える/);
  assert.match(html, /SELECTED WORKS/);
  assert.match(html, /現場ヒアリング・課題特定/);
  assert.match(html, /課題を解決する/);
  assert.match(html, /scroll-guide/);
  assert.match(html, /\/assets\/projects\/ai-literacy\.png/);
  assert.match(html, /\/works\/project-01/);
  assert.match(html, /詳しく見る/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/);
});

test("keeps the portfolio metadata and implementation self-contained", async () => {
  const [page, data, layout, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /function Header/);
  assert.match(page, /function ScrollProgress/);
  assert.match(page, /function WorkflowCard/);
  assert.match(data, /featured\?: boolean/);
  assert.match(data, /featured: true/);
  assert.match(layout, /lang="ja"/);
  assert.match(layout, /@fontsource-variable\/noto-sans-jp/);
  assert.match(layout, /Tsubasa's Portfolio/);
  assert.match(styles, /\.scroll-progress/);
  assert.match(styles, /\.workflow-track/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
