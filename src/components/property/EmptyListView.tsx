import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

export const EmptyListView: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <FontAwesome name="search" size={50} color={theme.textTertiary} />
      <Text style={styles.emptyText}>No properties found</Text>
      <Text style={styles.emptySubText}>Try changing your search criteria</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: theme.textPrimary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
});
