import { useState, useCallback } from "react";
import propertiesData from "../data/properties.json";
import { Property } from "@/types";

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
}

export function useFetchProperties(favorites: string[]): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // attach isFavorite flag
      const propertiesWithFavorites = propertiesData.map((property) => ({
        ...property,
        isFavorite: favorites.includes(property.id),
      }));

      setProperties(propertiesWithFavorites);
    } catch (err: any) {
      const message = err?.message || "Failed to load properties";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  return {
    properties,
    loading,
    error,
    fetchProperties,
  };
}
