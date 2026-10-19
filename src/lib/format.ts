const LOCALE = 'en-US';

const parseDate = (value?: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

type MonthStyle = 'short' | 'long';

export const formatMonthYear = (value?: string | null, month: MonthStyle = 'short'): string => {
  const date = parseDate(value);
  return date
    ? date.toLocaleDateString(LOCALE, { month, year: 'numeric', timeZone: 'UTC' })
    : '';
};

export const formatYear = (value?: string | null): string => {
  const date = parseDate(value);
  return date ? String(date.getUTCFullYear()) : '';
};

export const formatDateRange = (
  start: string,
  end?: string | null,
  isCurrent = false,
  granularity: 'month' | 'year' = 'month',
): string => {
  const format = granularity === 'year' ? formatYear : (v?: string | null) => formatMonthYear(v);
  const from = format(start);
  const to = isCurrent ? 'Present' : format(end);
  return to ? `${from} — ${to}` : from;
};

/** LinkedIn-style inclusive duration, e.g. "1 yr 3 mos". */
export const formatDuration = (start: string, end?: string | null, isCurrent = false): string => {
  const from = parseDate(start);
  const to = isCurrent ? new Date() : parseDate(end);
  if (!from || !to) return '';

  const totalMonths = Math.max(
    1,
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth()) + 1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [
    years ? `${years} yr${years > 1 ? 's' : ''}` : '',
    months ? `${months} mo${months > 1 ? 's' : ''}` : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const toExternalUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export const toEmailHref = (emailUrl?: string | null, email?: string | null): string | undefined => {
  if (emailUrl) {
    if (emailUrl.startsWith('mailto:') || /^https?:\/\//i.test(emailUrl)) return emailUrl;
    return emailUrl.includes('@') ? `mailto:${emailUrl}` : `https://${emailUrl}`;
  }
  return email ? `mailto:${email}` : undefined;
};

export const getInitials = (name?: string | null): string =>
  (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');