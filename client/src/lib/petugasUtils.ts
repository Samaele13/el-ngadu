import type { Petugas } from "@/types";

const LEVEL_VARIANTS = { admin: "default", petugas: "secondary" } as const;

export const getLevelVariant = (level: Petugas["level"]) => {
  return LEVEL_VARIANTS[level] || "secondary";
};

export const formatLevel = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};
