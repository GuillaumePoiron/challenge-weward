import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  const colors = [COLORS.primaryBackground, COLORS.secondaryBackground];

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.stripesContainer}>
          <View style={styles.stripesContainer}>
            {Array.from({ length: 15 }, (_, i) => (
              <View
                key={i}
                style={[styles.stripe, { backgroundColor: colors[i % 2] }]}
              />
            ))}
          </View>
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stripesContainer: {
    flex: 1,
    flexDirection: "row",
  },
  stripe: {
    flex: 1,
  },
});
