/**
 * Enum for price range categories
 */
export enum PriceRange {
  All = "All",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

/**
 * Price range bounds
 */
export interface PriceRangeBounds {
  min: number;
  max: number | null;
}

/**
 * Property interface
 */
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  isFavorite?: boolean;
}

/**
 * Filter option interface
 */
export interface FilterOption {
  id: string;
  label: string;
  value: any;
}

/**
 * Search filters interface
 */
export interface SearchFilters {
  priceRanges: PriceRange[];
  query: string;
}
