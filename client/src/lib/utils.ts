import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exportToCsv<T extends object>(
  filename: string,
  rows: T[]
): void {
  if (!rows || rows.length === 0) {
    return;
  }

  const separator = ",";
  const keys = Object.keys(rows[0]) as Array<keyof T>;

  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            const cellValue = row[k];
            let cell =
              cellValue === null || cellValue === undefined
                ? ""
                : String(cellValue);
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const calculateProfileProgress = (user: User | null): number => {
  if (!user) return 0;

  let totalFields = 0;
  let filledFields = 0;

  const commonFields = ["username", "telp"];
  totalFields += commonFields.length;
  commonFields.forEach((field) => {
    if (user[field as keyof User]) filledFields++;
  });

  if (user.userType === "masyarakat") {
    const masyarakatFields = ["nama", "nik"];
    totalFields += masyarakatFields.length;
    masyarakatFields.forEach((field) => {
      if (user[field as keyof typeof user]) filledFields++;
    });
  } else if (user.userType === "petugas") {
    const petugasFields = ["nama_petugas", "level"];
    totalFields += petugasFields.length;
    petugasFields.forEach((field) => {
      if (user[field as keyof typeof user]) filledFields++;
    });
  }

  if (totalFields === 0) return 100;

  return Math.round((filledFields / totalFields) * 100);
};
