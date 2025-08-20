import PropertyList from "@/src/components/property/PropertyList";
import { theme } from "@/src/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../../src/context/FavoritesContext";

import { useFetchProperties } from "@/src/hooks/useFetchProperties";

export default function FavoritesScreen() {
  const { favorites, isLoaded, loadFavorites } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);

  const { properties, loading, fetchProperties } =
    useFetchProperties(favorites);

  useEffect(() => {
    if (isLoaded) {
      fetchProperties();
    }
  }, [fetchProperties, isLoaded]);

  const favoriteProperties = properties.filter((property) =>
    favorites.includes(property.id)
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadFavorites(); // Reload favorites from storage
      await fetchProperties(); // Refetch properties
    } catch (error) {
      console.error("Failed to refresh favorites:", error);
    } finally {
      setRefreshing(false);
    }
  };
  if (favoriteProperties.length === 0 && !loading && isLoaded) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <FontAwesome name="heart-o" size={64} color={theme.textTertiary} />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Tap the heart icon on properties you like to add them to your
          favorites.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PropertyList
        onRefresh={handleRefresh}
        properties={favoriteProperties}
        loading={loading}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: theme.textPrimary,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.textSecondary,
    lineHeight: 24,
  },
});
