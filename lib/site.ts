export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');

export const siteName = 'Purrfold';

export const brandColors = {
  background: '#f7f3ec',
  card: '#fffaf7',
  foreground: '#2f2923',
  muted: '#766b60',
  primary: '#2f718d',
  primaryForeground: '#f7fbfd',
  accent: '#e9b88f',
  border: '#ded4c8',
} as const;

export function buildAbsoluteSiteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}
