import { useState, useCallback } from "react";

import properties from "../data/properties.json";
import { Property } from "@/types";

async function getPropertyById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const property = properties.find((p) => p.id === id);

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
}

interface UsePropertyResult {
  property: Property | null;
  loading: boolean;
  error: string | null;
  fetchProperty: (propertyId: string) => Promise<void>;
}

export function useFetchProperty(): UsePropertyResult {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async (propertyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPropertyById(propertyId);
      setProperty(data);
    } catch (err: any) {
      const message = err?.message || "Failed to load property details";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    property,
    loading,
    error,
    fetchProperty,
  };
}
