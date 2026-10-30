import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
