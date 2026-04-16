export type BorderBeamSize = 'sm' | 'md' | 'line';

export type BorderBeamTheme = 'dark' | 'light' | 'auto';

export type BorderBeamColorVariant = 'colorful' | 'mono' | 'ocean' | 'sunset';

export interface SizeConfig {
  borderRadius: number;
  borderWidth: number;
  width?: number;
  height?: number;
}

export interface ThemeColors {
  strokeOpacity: number;
  innerOpacity: number;
  bloomOpacity: number;
  innerShadow: string;
  saturation: number;
}

export interface BorderBeamProps {
  size?: BorderBeamSize;
  colorVariant?: BorderBeamColorVariant;
  theme?: BorderBeamTheme;
  staticColors?: boolean;
  duration?: number;
  active?: boolean;
  borderRadius?: number;
  brightness?: number;
  saturation?: number;
  hueRange?: number;
  strength?: number;
}
