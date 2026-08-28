"use strict";

function normalizeBasePath (value) {
  const segments = (value || "/").trim().split("/").filter(Boolean);

  if (segments.some(segment => {
    let decodedSegment;

    try {
      decodedSegment = decodeURIComponent(segment);
    } catch {
      throw new Error("BASE_PATH must use valid URL encoding.");
    }

    return decodedSegment === "." || decodedSegment === "..";
  })) {
    throw new Error("BASE_PATH must not contain relative path segments.");
  }

  return segments.length > 0 ? `/${segments.join("/")}/` : "/";
}

module.exports = normalizeBasePath;
