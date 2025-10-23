import { useState, useCallback, useMemo, useEffect } from "react";
import { fetchRandomWord } from "../services/randomWordApi";
import { generateAvailableLetters, initializeSelectedLetters } from "../utils";
import { Letter, PexelsPhoto } from "../types";
import pexels from "../services/pexels";

interface UseGameReturn {
  word: string | undefined;
  availableLetters: Letter[];
  selectedLetters: Array<Letter | null>;
  images: PexelsPhoto[];
  isLoadingGame: boolean;
  error: string | null;
  isVictory: boolean;
  handleAvailableLetterPress: (id: string) => void;
  handleSelectedLetterPress: (id: string | null) => void;
  handleClearPress: () => void;
  fetchData: () => Promise<void>;
  resetGame: () => Promise<void>;
}

export function useGame(): UseGameReturn {
  const [word, setWord] = useState<string | undefined>();
  const [availableLetters, setAvailableLetters] = useState<Letter[]>([]);
  const [selectedLetterIds, setSelectedLetterIds] = useState<
    Array<string | null>
  >([]);
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(true);
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

  const fetchData = useCallback(async () => {
    const wordLength = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

    try {
      setIsLoadingGame(true);
      setError(null);
      setIsVictory(false);

      const recoveredWord = await fetchRandomWord(wordLength);
      const letters = generateAvailableLetters(recoveredWord);
      const initializedSelected = initializeSelectedLetters(recoveredWord);

      setWord(recoveredWord);
      setAvailableLetters(letters);
      setSelectedLetterIds(initializedSelected);

      console.log("word fetched :", recoveredWord);

      const res: any = await pexels.photos.search({
        query: recoveredWord,
        per_page: 4,
      });

      if (res.photos && res.photos.length > 0) {
        setImages(res.photos as PexelsPhoto[]);
      } else {
        setImages([]);
      }
    } catch (err) {
      setError("Failed to load word or images");
      setImages([]);
    } finally {
      setIsLoadingGame(false);
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

  const handleClearPress = useCallback(() => {
    const newAvailableLetters = availableLetters.map((letter) => ({
      ...letter,
      isSelected: false,
    }));

    const newSelectedLetterIds = selectedLetterIds.map(() => null);

    setAvailableLetters(newAvailableLetters);
    setSelectedLetterIds(newSelectedLetterIds);
  }, [availableLetters, selectedLetterIds]);

  const resetGame = useCallback(async () => {
    await fetchData();
    setIsVictory(false);
  }, [fetchData]);

  useEffect(() => {
    if (checkVictory && !isVictory) {
      setIsVictory(true);
    }
  }, [checkVictory, isVictory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    word,
    availableLetters,
    selectedLetters,
    images,
    isLoadingGame,
    error,
    isVictory,
    handleAvailableLetterPress,
    handleSelectedLetterPress,
    handleClearPress,
    fetchData,
    resetGame,
  };
}
