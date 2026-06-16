export function resolvePublicAssetPath(relativePath: string): string {
  const normalized = relativePath.replace(/^\/+/, "");
  return new URL(normalized, document.baseURI).toString();
}
