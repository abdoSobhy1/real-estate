import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getPriceRangeDescription } from "../../utils/utils";
import { theme } from "../../constants/theme";
import { PriceRange } from "../../types";

interface FilterPillsProps {
  filters: PriceRange[];
  onRemoveFilter: (filter: PriceRange) => void;
  onResetFilters: () => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  onRemoveFilter,
  onResetFilters,
}) => {
  if (filters.includes(PriceRange.All) || filters.length === 0) {
    return null;
  }

  return (
    <View style={styles.activeFilterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={styles.activeFilterPill}
          onPress={() => onRemoveFilter(filter)}
        >
          <Text style={styles.activeFilterText}>
            {getPriceRangeDescription([filter])}
          </Text>
          <FontAwesome
            name="times"
            size={14}
            color="#fff"
            style={styles.activeFilterIcon}
          />
        </TouchableOpacity>
      ))}

      {filters.length > 1 && (
        <TouchableOpacity
          style={[styles.activeFilterPill, styles.clearAllPill]}
          onPress={onResetFilters}
        >
          <Text style={styles.activeFilterText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activeFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  activeFilterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  clearAllPill: {
    backgroundColor: theme.warning,
  },
  activeFilterText: {
    color: theme.textPrimary,
    fontWeight: "600",
    fontSize: 14,
    marginRight: 6,
  },
  activeFilterIcon: {
    marginLeft: 2,
    color: theme.textPrimary,
  },
});
