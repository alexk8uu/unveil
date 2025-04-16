export const INTEREST = [
  "technology",
  "sports",
  "music",
  "art",
  "travel",
  "food",
  "fashion",
  "gaming",
  "fitness",
  "photography",
  "movies",
  "books",
  "nature",
  "science",
  "history",
  "health",
  "gastronomy",
] as const;

export type Interest = (typeof INTEREST)[number];
