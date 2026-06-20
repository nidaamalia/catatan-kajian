import { Kajian } from "./types";
import { ulumulQuran } from "./kajians/ulumul-quran";
// import { contohFormat } from "./kajians/contoh-format"; // Jangan lupa import jika ingin menampilkannya

// Export types agar file yg lain tetap bisa menggunakan dari sini
export * from "./types";

export const kajianList: Kajian[] = [
  ulumulQuran,
  // contohFormat,
];
