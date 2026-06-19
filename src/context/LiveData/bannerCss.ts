import type { CSSProperties } from "react";

export type BannerCSS = string;

type LegacyBannerCSSObject = {
  padding?: string;
  font?: string;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  textShadow?: string;
};

export function kebabToCamel(input: string): string {
  return input.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function camelToKebab(input: string): string {
  return input.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

export function normalizeBannerCSS(value: unknown): BannerCSS {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const entries = Object.entries(value as LegacyBannerCSSObject)
    .filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== "")
    .filter(([key]) => key !== "onBox")
    .map(([key, entryValue]) => `${camelToKebab(key)}: ${String(entryValue)}`);

  return entries.join(";\n");
}

export function combineBannerCSS(...values: Array<unknown>): BannerCSS {
  return values
    .map(normalizeBannerCSS)
    .filter(Boolean)
    .join(";\n");
}

export function parseBannerCSS(value: unknown): CSSProperties {
  const style: CSSProperties = {};

  const normalized = normalizeBannerCSS(value);
  if (!normalized) {
    return style;
  }

  normalized.split(";").forEach((entry) => {
    const trimmedEntry = entry.trim();
    if (!trimmedEntry) return;

    const colonIndex = trimmedEntry.indexOf(":");
    if (colonIndex < 0) return;

    const rawKey = trimmedEntry.slice(0, colonIndex).trim();
    const rawValue = trimmedEntry.slice(colonIndex + 1).trim();
    if (!rawKey || !rawValue) return;

    const reactKey = kebabToCamel(rawKey) as keyof CSSProperties;
    (style as Record<string, string>)[reactKey] = rawValue;
  });

  return style;
}
