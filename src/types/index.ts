export type Letter = {
  id: string;
  value: string;
  index?: number;
  isSelected?: boolean;
};

export interface PexelsPhoto {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: PhotoSrc;
  url: string;
  width: number;
}

export interface PhotoSrc {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}
