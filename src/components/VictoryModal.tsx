import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants/dimensions";

interface VictoryModalProps {
  visible: boolean;
  onNextWord: () => void;
}

export function VictoryModal({ visible, onNextWord }: VictoryModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNextWord}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Congratulations</Text>
          <Text style={styles.wordText}>You found the word</Text>

          <Pressable onPress={onNextWord}>
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
                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.primaryBackground,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    minWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "HelveticaNeueBold",
    color: COLORS.white,
    marginBottom: 16,
    textAlign: "center",
  },
  wordText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 8,
  },
  buttonContainer: {
    width: SCREEN_WIDTH / 2,
    backgroundColor: COLORS.solutionButtonBackground,
    borderRadius: 4,
    transform: [{ translateY: 4 }],
    marginTop: 16,
  },
  buttonFace: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -4 }],
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "HelveticaNeueBold",
    textAlign: "center",
  },
});
