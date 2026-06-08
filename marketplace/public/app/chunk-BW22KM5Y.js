// src/app/core/utils/image-path.ts
function getProductImageSrc(imagePath) {
  if (!imagePath) {
    return "";
  }
  const normalized = imagePath.trim().replace(/^\/+/, "");
  if (normalized.startsWith("assets/products/")) {
    return "/" + normalized;
  }
  if (normalized.startsWith("products/")) {
    return "/assets/" + normalized;
  }
  return "/" + normalized;
}

export {
  getProductImageSrc
};
//# sourceMappingURL=chunk-BW22KM5Y.js.map
