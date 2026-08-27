"use strict";

const fs = require("fs");
const path = require("path");
const resolveDistAsset = require("./pages-path");

const DIST_DIR = path.resolve(__dirname, "../dist");
const SITE_URL = "https://chengchuu.github.io/json-to-resume/";
const SITE_PATH = "/json-to-resume/";
const DESCRIPTION = "Generate a printable resume from structured JSON data with this Vue-powered live demo.";

function assert (condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readRequiredFile (fileName) {
  const filePath = path.join(DIST_DIR, fileName);
  assert(fs.existsSync(filePath), "Missing dist/" + fileName + ".");
  return fs.readFileSync(filePath, "utf8");
}

function getTags (html, tagName) {
  return html.match(new RegExp("<" + tagName + "\\b[^>]*>", "gi")) || [];
}

function getAttribute (tag, attributeName) {
  const match = tag.match(new RegExp("\\b" + attributeName + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return match ? match[2] : "";
}

function getSingleMetaContent (html, attributeName, attributeValue) {
  const tags = getTags(html, "meta").filter(tag => (
    getAttribute(tag, attributeName).toLowerCase() === attributeValue.toLowerCase()
  ));
  assert(tags.length === 1, "Expected exactly one " + attributeName + "=\"" + attributeValue + "\" meta tag.");

  const content = getAttribute(tags[0], "content");
  assert(content, "Missing content for " + attributeName + "=\"" + attributeValue + "\".");
  return content;
}

const html = readRequiredFile("index.html");
const robots = readRequiredFile("robots.txt");
const sitemap = readRequiredFile("sitemap.xml");

assert(/<title>JSON to Resume – Live Demo<\/title>/i.test(html), "Missing the required page title.");
assert(getSingleMetaContent(html, "name", "viewport").replace(/\s/g, "") === "width=device-width,initial-scale=1", "Invalid viewport metadata.");
assert(getSingleMetaContent(html, "name", "description") === DESCRIPTION, "Invalid description metadata.");
assert(getSingleMetaContent(html, "name", "robots") === "index, follow", "Invalid robots metadata.");
assert(getSingleMetaContent(html, "property", "og:type") === "website", "Invalid Open Graph type.");
assert(getSingleMetaContent(html, "property", "og:title") === "JSON to Resume – Live Demo", "Invalid Open Graph title.");
assert(getSingleMetaContent(html, "property", "og:description") === DESCRIPTION, "Invalid Open Graph description.");
assert(getSingleMetaContent(html, "property", "og:url") === SITE_URL, "Invalid Open Graph URL.");

const canonicalLinks = getTags(html, "link").filter(tag => (
  getAttribute(tag, "rel").toLowerCase().split(/\s+/).includes("canonical")
));
assert(canonicalLinks.length === 1, "Expected exactly one canonical link.");
assert(getAttribute(canonicalLinks[0], "href") === SITE_URL, "Invalid canonical URL.");

const iconLinks = getTags(html, "link").filter(tag => (
  getAttribute(tag, "rel").toLowerCase().split(/\s+/).includes("icon")
));
assert(iconLinks.length === 2, "Expected exactly two favicon links.");
assert(iconLinks.every(tag => getAttribute(tag, "href").startsWith("https://")), "Favicon URLs must use HTTPS.");

const jsonLdScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => getAttribute(match[1], "type").toLowerCase() === "application/ld+json");
assert(jsonLdScripts.length === 1, "Expected exactly one JSON-LD script.");

let jsonLd;
try {
  jsonLd = JSON.parse(jsonLdScripts[0][2]);
} catch (error) {
  throw new Error("Invalid JSON-LD: " + error.message);
}

assert(jsonLd["@context"] === "https://schema.org", "Invalid JSON-LD context.");
assert(jsonLd["@type"] === "WebApplication", "Invalid JSON-LD type.");
assert(jsonLd.name === "JSON to Resume", "Invalid JSON-LD name.");
assert(jsonLd.url === SITE_URL, "Invalid JSON-LD URL.");
assert(jsonLd.description === DESCRIPTION, "Invalid JSON-LD description.");
assert(jsonLd.applicationCategory === "BusinessApplication", "Invalid JSON-LD application category.");
assert(jsonLd.operatingSystem === "Any", "Invalid JSON-LD operating system.");

const localAssets = [...html.matchAll(/\b(?:src|href)=(["'])(.*?)\1/gi)]
  .map(match => match[2])
  .filter(url => !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url));
assert(localAssets.length > 0, "No local HTML assets were found.");

localAssets.forEach(url => {
  assert(!url.startsWith("/static/"), "Local asset uses the root path instead of the Pages path: " + url);
  assert(url.startsWith(SITE_PATH), "Local asset uses an unexpected path: " + url);

  const assetPath = url.split(/[?#]/)[0].slice(SITE_PATH.length);
  assert(assetPath, "Local asset path is empty: " + url);
  assert(fs.existsSync(resolveDistAsset(DIST_DIR, assetPath)), "Referenced local asset is missing: " + url);
});

const robotsSitemapUrls = [...robots.matchAll(/^Sitemap:\s*(\S+)$/gim)].map(match => match[1]);
assert(robotsSitemapUrls.length === 1, "Expected exactly one sitemap URL in robots.txt.");
assert(robotsSitemapUrls[0] === SITE_URL + "sitemap.xml", "Invalid robots.txt sitemap URL.");

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gi)].map(match => match[1]);
assert(sitemapUrls.length === 1, "Expected exactly one sitemap URL.");
assert(sitemapUrls[0] === SITE_URL, "Invalid sitemap canonical URL.");

console.log("GitHub Pages artifact validation passed.");
