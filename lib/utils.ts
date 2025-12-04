import { type ClassValue, clsx } from 'clsx'

// Simple cn utility without tailwind-merge (lighter)
// For a dentist site, we don't need the full tailwind-merge overhead
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
