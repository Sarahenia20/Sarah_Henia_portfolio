import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Joins Tailwind class names and resolves conflicts (the last one wins).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
