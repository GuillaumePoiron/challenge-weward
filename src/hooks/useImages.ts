import { useState, useEffect } from "react";
import pexels from "../services/pexels";
import { PexelsPhoto } from "../types";

interface UseImagesReturn {
  images: PexelsPhoto[];
  isLoading: boolean;
  error: string | null;
}

export function useImages(word: string | undefined): UseImagesReturn {
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word || word.length === 0) return;

    console.log("word fetched :", word);

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res: any = await pexels.photos.search({
          query: word,
          per_page: 4,
        });

        if (!res.photos || res.photos.length === 0) {
          throw new Error("No images found");
        }

        setImages(res.photos as PexelsPhoto[]);
      } catch (err) {
        setError("Failed to load images");
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [word]);

  return {
    images,
    isLoading,
    error,
  };
}
