import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useImages } from "./src/hooks/useImages";
import { useGame } from "./src/hooks/useGame";
import { Background } from "./src/components/Background";
import { ImageGrid } from "./src/components/ImageGrid";
import { SelectedLetterGrid } from "./src/components/SelectedLetterGrid";
import { AvailableLetterGrid } from "./src/components/AvailableLetterGrid";
import { VictoryModal } from "./src/components/VictoryModal";
import { COLORS } from "./src/constants/colors";
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
    isLoading: isGameLoading,
    error: gameError,
    isVictory,
    handleAvailableLetterPress,
    handleSelectedLetterPress,
    handleSolutionPress,
    fetchWord,
    resetGame,
  } = useGame();

  const {
    images,
    isLoading: isImagesLoading,
    error: imagesError,
  } = useImages(word);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Background>
        {!fontsLoaded && !fontError ? (
          <LoadingScreen />
        ) : isGameLoading || isImagesLoading ? (
          <LoadingScreen />
        ) : gameError || imagesError ? (
          <ErrorScreen
            gameError={gameError}
            imagesError={imagesError}
            fetchWord={fetchWord}
          />
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
                handleSolutionPress={handleSolutionPress}
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
