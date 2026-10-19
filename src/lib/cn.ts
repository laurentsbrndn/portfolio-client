import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names and resolve Tailwind conflicts (e.g. p-6 vs p-0). */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));