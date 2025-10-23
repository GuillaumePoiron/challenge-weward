import { StyleSheet, View, Pressable, Text } from "react-native";
import { COLORS } from "../constants/colors";

interface ErrorScreenProps {
  gameError: string | null;
  fetchWord: () => void;
}

export function ErrorScreen({
  gameError,
  fetchWord,
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleError}>Oops</Text>
      <Text style={styles.textError}>
        An error has occurred{"\n"}
        {gameError}
      </Text>
      <Text style={styles.textCheckConnection}>
        Please check your internet connection
      </Text>
      <Pressable style={styles.retryButton} onPress={fetchWord}>
        <Text style={styles.textRetryButton}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleError: {
    color: COLORS.red,
    fontSize: 32,
    fontFamily: "HelveticaNeueBold",
    marginBottom: 8,
  },
  textError: {
    color: COLORS.red,
    fontFamily: "HelveticaNeueBold",
    fontSize: 18,
  },
  textCheckConnection: {
    color: COLORS.red,
    fontFamily: "HelveticaNeueBold",
    fontSize: 18,
    marginTop: 16,
  },
  retryButton: {
    width: 120,
    backgroundColor: COLORS.red,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  textRetryButton: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "HelveticaNeueBold",
  },
});
