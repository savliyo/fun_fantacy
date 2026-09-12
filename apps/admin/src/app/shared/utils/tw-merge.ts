import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergetw(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
