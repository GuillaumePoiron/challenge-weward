import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { ClearButton } from "./ClearButton";
import { AvailableLetterButton } from "./AvailableLetterButton";
import { Letter } from "../types";

interface AvailableLetterGridProps {
  availableLetters: Array<Letter>;
  handleClearPress: () => void;
  handleAvailableLetterPress: (id: string) => void;
}

export const AvailableLetterGrid = ({
  availableLetters,
  handleClearPress,
  handleAvailableLetterPress,
}: AvailableLetterGridProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.availableLettersContainer}>
        {availableLetters.map((letter, index) => (
          <AvailableLetterButton
            key={`${index}-${letter.id}`}
            letter={letter}
            onPress={() => handleAvailableLetterPress(letter.id)}
          />
        ))}
      </View>
      <ClearButton onPress={handleClearPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  availableLettersContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 6,
  },
});
