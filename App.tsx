import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useGame } from "./src/hooks/useGame";
import { Background } from "./src/components/Background";
import { ImageGrid } from "./src/components/ImageGrid";
import { SelectedLetterGrid } from "./src/components/SelectedLetterGrid";
import { AvailableLetterGrid } from "./src/components/AvailableLetterGrid";
import { VictoryModal } from "./src/components/VictoryModal";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "./src/components/LoadingScreen";
import { ErrorScreen } from "./src/components/ErrorScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    HelveticaNeueBold: require("./assets/fonts/HelveticaNeueBold.otf"),
  });

  const {
    word,
    availableLetters,
    selectedLetters,
    images,
    isLoadingGame,
    error: gameError,
    isVictory,
    handleAvailableLetterPress,
    handleSelectedLetterPress,
    handleClearPress,
    fetchData,
    resetGame,
  } = useGame();

  const isLoading = !fontsLoaded || isLoadingGame;
  const hasError = fontError || gameError;

  useEffect(() => {
    if (!isLoading || hasError) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, hasError]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Background>
        {isLoading ? (
          <LoadingScreen />
        ) : hasError ? (
          <ErrorScreen gameError={gameError} fetchWord={fetchData} />
        ) : (
          <>
            <View style={styles.container}>
              <ImageGrid images={images} />
              <SelectedLetterGrid
                selectedLetters={selectedLetters}
                word={word}
                handleSelectedLetterPress={handleSelectedLetterPress}
              />
              <AvailableLetterGrid
                availableLetters={availableLetters}
                handleAvailableLetterPress={handleAvailableLetterPress}
                handleClearPress={handleClearPress}
              />
            </View>
            <VictoryModal visible={isVictory} onNextWord={resetGame} />
          </>
        )}
      </Background>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
});
