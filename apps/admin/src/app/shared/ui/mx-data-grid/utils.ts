export const slugify = (value: string): string => {
  return value.replace(/\s+/g, '-').toLowerCase()
}
