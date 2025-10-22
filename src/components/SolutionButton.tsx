import { View, StyleSheet, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants/dimensions";
import BrushIcon from "./icons/BrushIcon";

interface ButtonSolutionProps {
  onPress: () => void;
}

export const SolutionButton = ({ onPress }: ButtonSolutionProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={[
            COLORS.solutionButtonGradientStart,
            COLORS.solutionButtonGradientEnd,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonFace}
        >
          <View style={styles.letterAndIconContainer}>
            <Text style={styles.letter}>A</Text>
            <View style={styles.iconContainer}>
              <BrushIcon size={20} color={COLORS.white} />
            </View>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.solutionButtonBackground,
    borderRadius: 4,
    transform: [{ translateY: 4 }],
    marginBottom: 4,
  },
  buttonFace: {
    flex: 1,
    width: Math.floor((SCREEN_WIDTH - 32 - 28) / (6 + 1)),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -4 }],
  },
  letterAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  iconContainer: {
    transform: [{ translateY: -16 }, { translateX: -4 }, { rotate: "-15deg" }],
  },
  letter: {
    fontSize: 28,
    fontFamily: "HelveticaNeueBold",
    fontWeight: "bold",
    color: COLORS.white,
    transform: [{ rotate: "-10deg" }],
  },
});
