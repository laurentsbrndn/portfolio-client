export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'organization', label: 'Organization' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type SectionId = NavItem['id'];