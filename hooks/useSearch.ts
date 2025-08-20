import { Property } from "@/types";
import { useState, useMemo } from "react";

type UseSearchProps = {
  items: Property[];
  searchKeys?: (keyof Property)[];
  initialQuery?: string;
};

export function useSearch({
  items,
  searchKeys = ["title", "location"],
  initialQuery = "",
}: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Apply search query to the items
  const searchedItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = String(item[key] ?? "").toLowerCase();
        return value.includes(query);
      });
    });
  }, [items, searchQuery, searchKeys]);

  return {
    searchQuery,
    setSearchQuery,
    searchedItems,
  };
}
