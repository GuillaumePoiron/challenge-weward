import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SelectedLetterButton } from "./SelectedLetterButton";
import { Letter } from "../types";
import { buildWordFromSelectedLetters } from "../utils";
import { COLORS } from "../constants/colors";

interface SelectedLetterGridProps {
  selectedLetters: Array<Letter | null>;
  word: string | undefined;
  handleSelectedLetterPress: (id: string | null) => void;
}

export const SelectedLetterGrid = ({
  selectedLetters,
  word,
  handleSelectedLetterPress,
}: SelectedLetterGridProps) => {
  const formedWord = useMemo(
    () => buildWordFromSelectedLetters(selectedLetters),
    [selectedLetters]
  );

  const isComplete = selectedLetters.every((letter) => letter !== null);
  const isWordCorrect = isComplete && formedWord === word?.toLowerCase();
  const colorLetter = !isComplete
    ? COLORS.white
    : isWordCorrect
    ? COLORS.green
    : COLORS.red;

  return (
    <View style={styles.container}>
      {selectedLetters.map((letter, index) => {
        return (
          <SelectedLetterButton
            key={`${index}-${letter?.id ?? index}`}
            letter={letter}
            colorLetter={colorLetter}
            onPress={() => handleSelectedLetterPress(letter?.id ?? null)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});
