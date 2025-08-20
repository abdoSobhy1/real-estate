import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import { useFilters } from "../../hooks/usePropertyFilter";
import { useSearch } from "../../hooks/useSearch";
import { Property } from "../../types";
import FilterModal from "../ui/FilterModal";
import { SearchBar } from "../ui/SearchBar";
import { CardShimmer } from "../ui/Shimmer";
import { EmptyListView } from "./EmptyListView";
import { FilterPills } from "./FilterPills";
import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  properties: Property[];
  onRefresh?: () => void;
  refreshing?: boolean;
  loading?: boolean;
  error?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onRefresh,
  refreshing = false,
  loading = false,
  error,
}) => {
  // Use search hook for search functionality
  const { searchQuery, setSearchQuery, searchedItems } = useSearch({
    items: properties,
    searchKeys: ["title", "location"],
  });

  // Use filters hook for filtering functionality
  const {
    activePriceFilters,
    selectedPriceFilters,
    filterModalVisible,
    filteredItems,
    hasActiveFilters,
    activeFilterCount,
    applyFilters,
    cancelFilters,
    handlePriceFilterSelection,
    resetFilters,
    removePriceFilter,
    openFilterModal,
  } = useFilters({
    items: searchedItems, // Apply filters to already searched items
  });

  if (error) {
    return (
      <View style={[styles.container, styles.ErrorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search bar component */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={openFilterModal}
        showFilterActive={hasActiveFilters}
        filterCount={activeFilterCount}
      />

      {/* Filter pills component */}
      <FilterPills
        filters={activePriceFilters}
        onRemoveFilter={removePriceFilter}
        onResetFilters={resetFilters}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={cancelFilters}
        currentFilter={selectedPriceFilters}
        onFilterChange={handlePriceFilterSelection}
        onApply={() => applyFilters({ priceRanges: selectedPriceFilters })}
        onCancel={cancelFilters}
        multiSelect={true}
      />

      <FlatList
        data={
          loading
            ? Array.from({ length: 6 }, (_, i) => ({ id: `shimmer-${i}` }))
            : filteredItems
        }
        renderItem={({ item }) => {
          if (loading) {
            return <CardShimmer />;
          }
          return <PropertyCard property={item as Property} />;
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? null : <EmptyListView />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  columnWrapper: {
    justifyContent: "flex-start",
  },
  listContent: {
    padding: 8,
  },
  ErrorContainer: {
    justifyContent: "center",
  },
  errorText: {
    color: theme.error,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 16,
  },
});

export default PropertyList;
