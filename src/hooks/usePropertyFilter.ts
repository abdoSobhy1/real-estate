import { useState, useMemo, useCallback } from "react";
import { PriceRange, Property } from "../types";
import { filterPropertiesByPriceRange } from "../utils/utils";

export interface FilterConfig {
  priceRanges?: PriceRange[];
  [key: string]: unknown;
}

interface UseFiltersProps {
  items: Property[];
  initialFilters?: FilterConfig;
  filterFn?: (item: Property, filters: FilterConfig) => boolean;
}

export function useFilters({
  items,
  initialFilters = { priceRanges: [PriceRange.All] },
  filterFn,
}: UseFiltersProps) {
  const [activeFilters, setActiveFilters] =
    useState<FilterConfig>(initialFilters);
  const [selectedFilters, setSelectedFilters] =
    useState<FilterConfig>(initialFilters);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Default filter function
  const defaultFilterFn = useCallback(
    (item: Property, filters: FilterConfig): boolean => {
      if (filters.priceRanges && filters.priceRanges.length > 0) {
        if (!filters.priceRanges.includes(PriceRange.All)) {
          const matchesPriceFilter =
            filterPropertiesByPriceRange([item], filters.priceRanges).length >
            0;
          if (!matchesPriceFilter) return false;
        }
      }

      for (const [key, value] of Object.entries(filters)) {
        if (key === "priceRanges") continue;
        if (value === undefined || value === null) continue;

        const itemValue = item[key as keyof Property];

        if (Array.isArray(value)) {
          if (value.length === 0 || value.includes("All")) continue;
          if (!value.includes(itemValue)) return false;
        } else if (typeof value === "object") {
          const { min, max } = value as { min?: number; max?: number };
          const numericValue = Number(itemValue);
          if (min !== undefined && numericValue < min) return false;
          if (max !== undefined && numericValue > max) return false;
        } else {
          if (itemValue !== value) return false;
        }
      }

      return true;
    },
    []
  );

  const filteredItems = useMemo(() => {
    const customFilterFn = filterFn || defaultFilterFn;
    return items.filter((item) => customFilterFn(item, activeFilters));
  }, [items, activeFilters, filterFn, defaultFilterFn]);

  const handlePriceFilterSelection = useCallback((filter: PriceRange) => {
    setSelectedFilters((prev) => {
      const currentPriceRanges = prev.priceRanges || [PriceRange.All];
      if (filter === PriceRange.All) {
        return { ...prev, priceRanges: [PriceRange.All] };
      } else {
        const newFilters = currentPriceRanges.filter(
          (f) => f !== PriceRange.All
        );
        if (newFilters.includes(filter)) {
          const updatedFilters = newFilters.filter((f) => f !== filter);
          return {
            ...prev,
            priceRanges:
              updatedFilters.length > 0 ? updatedFilters : [PriceRange.All],
          };
        } else {
          return { ...prev, priceRanges: [...newFilters, filter] };
        }
      }
    });
  }, []);

  const applyFilters = useCallback((filters: FilterConfig) => {
    setActiveFilters(filters);
    setFilterModalVisible(false);
  }, []);

  const cancelFilters = useCallback(() => {
    setSelectedFilters({ ...activeFilters });
    setFilterModalVisible(false);
  }, [activeFilters]);

  const resetFilters = useCallback(() => {
    const defaultFilters = { priceRanges: [PriceRange.All] };
    setActiveFilters(defaultFilters);
    setSelectedFilters(defaultFilters);
  }, []);

  const removePriceFilter = useCallback((filter: PriceRange) => {
    setActiveFilters((prev) => {
      const currentPriceRanges = prev.priceRanges || [PriceRange.All];
      const updatedFilters = currentPriceRanges.filter((f) => f !== filter);
      return {
        ...prev,
        priceRanges:
          updatedFilters.length > 0 ? updatedFilters : [PriceRange.All],
      };
    });

    setSelectedFilters((prev) => {
      const currentPriceRanges = prev.priceRanges || [PriceRange.All];
      const updatedFilters = currentPriceRanges.filter((f) => f !== filter);
      return {
        ...prev,
        priceRanges:
          updatedFilters.length > 0 ? updatedFilters : [PriceRange.All],
      };
    });
  }, []);

  const openFilterModal = useCallback(() => {
    setSelectedFilters({ ...activeFilters });
    setFilterModalVisible(true);
  }, [activeFilters]);

  const hasActiveFilters = useMemo(() => {
    const priceRanges = activeFilters.priceRanges || [PriceRange.All];
    return (
      !priceRanges.includes(PriceRange.All) ||
      Object.keys(activeFilters).some(
        (key) => key !== "priceRanges" && activeFilters[key] !== undefined
      )
    );
  }, [activeFilters]);

  const activeFilterCount = useMemo(() => {
    const priceRanges = activeFilters.priceRanges || [PriceRange.All];
    let count = 0;
    if (!priceRanges.includes(PriceRange.All)) count += priceRanges.length;
    Object.keys(activeFilters).forEach((key) => {
      if (key !== "priceRanges" && activeFilters[key] !== undefined) count += 1;
    });
    return count;
  }, [activeFilters]);

  return {
    activeFilters,
    selectedFilters,
    filterModalVisible,
    filteredItems,
    hasActiveFilters,
    activeFilterCount,
    activePriceFilters: activeFilters.priceRanges || [PriceRange.All],
    selectedPriceFilters: selectedFilters.priceRanges || [PriceRange.All],
    applyFilters,
    cancelFilters,
    resetFilters,
    openFilterModal,
    handlePriceFilterSelection,
    removePriceFilter,
    setSelectedFilters,
  };
}

export const usePropertyFilter = useFilters;
