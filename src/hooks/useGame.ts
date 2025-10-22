import { useState, useCallback, useMemo, useEffect } from "react";
import { fetchRandomWord } from "../services/randomWordApi";
import { generateAvailableLetters, initializeSelectedLetters } from "../utils";
import { Letter } from "../types";

interface UseGameReturn {
  word: string | undefined;
  availableLetters: Letter[];
  selectedLetters: Array<Letter | null>;
  isLoading: boolean;
  error: string | null;
  isVictory: boolean;
  handleAvailableLetterPress: (id: string) => void;
  handleSelectedLetterPress: (id: string | null) => void;
  handleSolutionPress: () => void;
  fetchWord: () => Promise<void>;
  resetGame: () => void;
}

export function useGame(): UseGameReturn {
  const [word, setWord] = useState<string | undefined>();
  const [availableLetters, setAvailableLetters] = useState<Letter[]>([]);
  const [selectedLetterIds, setSelectedLetterIds] = useState<Array<string | null>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  const selectedLetters: Array<Letter | null> = useMemo(() => {
    return selectedLetterIds.map((id) =>
      id ? availableLetters.find((letter) => letter?.id === id) || null : null
    );
  }, [availableLetters, selectedLetterIds]);

  const checkVictory = useMemo(() => {
    if (!word || selectedLetterIds.includes(null)) return false;

    const wordFound = selectedLetters
      .map((letter) => letter?.value)
      .join("")
      .toLowerCase();

    return wordFound === word.toLowerCase();
  }, [selectedLetterIds, selectedLetters, word]);

  const fetchWord = useCallback(async () => {
    const wordLength = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

    try {
      setIsLoading(true);
      setError(null);
      setIsVictory(false);

      const recoveredWord = await fetchRandomWord(wordLength);
      const letters = generateAvailableLetters(recoveredWord);
      const initializedSelected = initializeSelectedLetters(recoveredWord);

      setWord(recoveredWord);
      setAvailableLetters(letters);
      setSelectedLetterIds(initializedSelected);
    } catch (err) {
      setError("Failed to load word");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectedLetterPress = useCallback(
    (id: string | null) => {
      if (!id) return;

      const letter = availableLetters.find((letter) => letter.id === id);
      if (!letter || letter.index === undefined) return;

      const newAvailableLetters = availableLetters.map((letter) =>
        letter.id === id ? { ...letter, isSelected: false } : letter
      );

      const newSelectedLetterIds = selectedLetterIds.map((selectedId) =>
        selectedId === id ? null : selectedId
      );

      setSelectedLetterIds(newSelectedLetterIds);
      setAvailableLetters(newAvailableLetters);
    },
    [selectedLetterIds, availableLetters]
  );

  const handleAvailableLetterPress = useCallback(
    (id: string) => {
      if (!id) return;

      const emptyIndex = selectedLetterIds.findIndex(
        (selectedId) => selectedId === null
      );
      if (emptyIndex === -1) return;

      const newSelectedLetterIds = [...selectedLetterIds];
      newSelectedLetterIds[emptyIndex] = id;

      const newAvailableLetters = availableLetters.map((letter) =>
        letter.id === id ? { ...letter, isSelected: true } : letter
      );

      setAvailableLetters(newAvailableLetters);
      setSelectedLetterIds(newSelectedLetterIds);
    },
    [selectedLetterIds, availableLetters]
  );

  const handleSolutionPress = useCallback(() => {
    const newAvailableLetters = availableLetters.map((letter) => ({
      ...letter,
      isSelected: false,
    }));

    const newSelectedLetterIds = selectedLetterIds.map(() => null);

    setAvailableLetters(newAvailableLetters);
    setSelectedLetterIds(newSelectedLetterIds);
  }, [availableLetters, selectedLetterIds]);

  const resetGame = useCallback(async () => {
    setIsVictory(false);
    setWord(undefined);
    setAvailableLetters([]);
    setSelectedLetterIds([]);

    await fetchWord();
  }, [fetchWord]);

  useEffect(() => {
    if (checkVictory && !isVictory) {
      setIsVictory(true);
    }
  }, [checkVictory, isVictory]);

  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  return {
    word,
    availableLetters,
    selectedLetters,
    isLoading,
    error,
    isVictory,
    handleAvailableLetterPress,
    handleSelectedLetterPress,
    handleSolutionPress,
    fetchWord,
    resetGame,
  };
}
