import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type FilterPill = {
  id: string;
  label: string;
};

type FilterPillsProps = {
  filters: FilterPill[];
  onRemove: (id: string) => void;
  pillStyle?: object;
  textStyle?: object;
};

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  onRemove,
  pillStyle,
  textStyle,
}) => {
  if (filters.length === 0) return null;

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <View key={filter.id} style={[styles.pill, pillStyle]}>
          <Text style={[styles.pillText, textStyle]} numberOfLines={1}>
            {filter.label}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(filter.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <FontAwesome name="close" size={12} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.surfaceHighlight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    maxWidth: 150,
  },
  pillText: {
    color: theme.textPrimary,
    fontSize: 12,
    marginRight: 5,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
