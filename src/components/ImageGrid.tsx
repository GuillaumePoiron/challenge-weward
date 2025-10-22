import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { PexelsPhoto } from "../types";
import { COLORS } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants/dimensions";

interface ImageGridProps {
  images: PexelsPhoto[];
}

const blurhash = "LTMQq,Rjxuf+%M~qj[IUozR*9Fxt";

export const ImageGrid = memo(({ images }: ImageGridProps) => {
  return (
    <View style={styles.imagesContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={`${index}-${images[index]?.id}`} style={styles.imageCard}>
          <Image
            source={{ uri: images[index]?.src?.medium }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={500}
            style={styles.image}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    gap: 12,
    paddingVertical: 12,
  },
  imageCard: {
    width: Math.floor((SCREEN_WIDTH - 32 - 12) / 2),
    height: Math.floor((SCREEN_WIDTH - 32 - 12) / 2),
    backgroundColor: COLORS.imageCardBackground,
    borderRadius: 8,
    padding: 6,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  loadingIndicator: {
    position: "absolute",
    top: "45%",
    left: "45%",
  },
});
