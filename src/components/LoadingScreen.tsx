import { StyleSheet, ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/colors";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={COLORS.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
