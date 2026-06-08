export function getProductImageSrc(imagePath?: string): string {
  if (!imagePath) {
    return '';
  }

  const normalized = imagePath.trim().replace(/^\/+/, '');

  if (normalized.startsWith('assets/products/')) {
    return '/' + normalized;
  }

  if (normalized.startsWith('products/')) {
    return '/assets/' + normalized;
  }

  return '/' + normalized;
}
