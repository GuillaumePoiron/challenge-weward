import { View, StyleSheet, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { Letter } from "../types";
import { COLORS } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants/dimensions";

interface AvailableLetterButtonProps {
  letter: Letter;
  onPress: () => void;
}

export const AvailableLetterButton = ({
  letter,
  onPress,
}: AvailableLetterButtonProps) => {

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (letter.isSelected) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.empty} />
      </View>
    );
  }

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonFace}>
          <Text style={styles.letter}>{letter.value}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: Math.floor((SCREEN_WIDTH - 32 - 42) / (6 + 1)),
    height: Math.floor((SCREEN_WIDTH - 32 - 42) / (6 + 1)) + 2,
    marginBottom: 4,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.availableButtonShadow,
    borderRadius: 4,
    transform: [{ translateY: 4 }],
  },
  buttonFace: {
    flex: 1,
    backgroundColor: COLORS.availableButtonBackground,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -4 }],
  },
  letter: {
    fontSize: 28,
    color: COLORS.black,
    fontFamily: "HelveticaNeueBold",
  },
  empty: {
    flex: 1,
    backgroundColor: COLORS.emptyAvailableButton,
    borderRadius: 4,
    transform: [{ translateY: 4 }],
  },
});
