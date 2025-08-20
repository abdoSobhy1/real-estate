import PropertyList from "@/src/components/property/PropertyList";
import { theme } from "@/src/constants/theme";
import { useFavorites } from "@/src/context/FavoritesContext";
import { useFetchProperties } from "@/src/hooks/useFetchProperties";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { favorites } = useFavorites();

  const { properties, loading, error, fetchProperties } =
    useFetchProperties(favorites);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProperties();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <PropertyList
          properties={[]}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          loading={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PropertyList
        properties={properties}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        loading={loading}
        error={error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});
