export function getProductImageSrc(imagePath?: string): string {
  if (!imagePath) {
    return '';
  }

  const normalized = imagePath.trim().replace(/^\/+/, '');
  const base = document.baseURI;

  if (normalized.startsWith('assets/products/')) {
    return new URL(`../${normalized}`, base).pathname;
  }

  if (normalized.startsWith('products/')) {
    return new URL(`../assets/${normalized}`, base).pathname;
  }

  return new URL(`../${normalized}`, base).pathname;
}
