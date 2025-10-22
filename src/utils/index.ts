import { Letter } from "../types";

export function generateAvailableLetters(word: string): Letter[] {
  const wordTable = word.toUpperCase().split("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const nbRandomLetters = 12 - wordTable.length;

  const randomLetters = Array.from({ length: nbRandomLetters }, () => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  });

  const merged = [...wordTable, ...randomLetters];

  for (let i = merged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [merged[i], merged[j]] = [merged[j], merged[i]];
  }

  return merged.map((letter, index) => ({
    id: Math.random().toString(36).slice(2, 9),
    value: letter,
    index,
  }));
}

export function initializeSelectedLetters(word: string): Array<string | null> {
  return Array.from({ length: word.length }, () => null);
}

export function buildWordFromSelectedLetters(
  selectedLetters: Array<Letter | null>
): string {
  return selectedLetters
    .map((letter) => letter?.value)
    .join("")
    .toLowerCase();
}
