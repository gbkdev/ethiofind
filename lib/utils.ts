export function initials(name: string): string {
  const caps = name
    .split(' ')
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (caps || name.slice(0, 2)).toUpperCase().slice(0, 2);
}

export function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}k` : String(n);
}

export function starString(rating: number): string {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

export function isValidUrl(url: string): boolean {
  return /^https?:\/\/[^\s]+\.[^\s]+/i.test(url.trim());
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function cx(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}
