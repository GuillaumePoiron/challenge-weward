import { StyleSheet, Text, Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import { Letter } from "../types";
import { COLORS } from "../constants/colors";

interface SelectedLetterButtonProps {
  letter: Letter | null;
  colorLetter: string;
  onPress: () => void;
}

export const SelectedLetterButton = ({
  letter,
  colorLetter,
  onPress,
}: SelectedLetterButtonProps) => {
  
  const handlePress = () => {
    if (letter) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonFace}>
          <Text style={[styles.text, { color: colorLetter }]}>
            {letter?.value}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#5b70a0",
    borderRadius: 4,
    transform: [{ translateY: 4 }],
  },
  buttonFace: {
    flex: 1,
    backgroundColor: COLORS.selectedButtonBackground,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -4 }],
    elevation: 15,
    shadowColor: COLORS.selectedButtonShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  text: {
    fontSize: 24,
    fontFamily: "HelveticaNeueBold",
  },
});
