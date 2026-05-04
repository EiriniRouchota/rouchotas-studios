const DEFAULT_SITE_URL = "https://rouchotas-studios.vercel.app";

function normalizeSiteUrl(rawUrl?: string): string {
  const candidate = rawUrl?.trim();
  if (!candidate) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteName = "Rouchotas Studios by Viktor";
