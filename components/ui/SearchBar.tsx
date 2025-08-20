import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterPress: () => void;
  showFilterActive: boolean;
  filterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterPress,
  showFilterActive,
  filterCount = 0,
}) => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome
        name="search"
        size={18}
        color="#666"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={theme.textTertiary}
      />
      {searchQuery && (
        <TouchableOpacity
          onPress={() => setSearchQuery("")}
          style={styles.clearButton}
        >
          <FontAwesome name="times-circle" size={18} color={theme.icon} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={onFilterPress}
        style={[
          styles.filterButton,
          showFilterActive && styles.filterButtonActive,
        ]}
      >
        <FontAwesome
          name="sliders"
          size={18}
          color={showFilterActive ? theme.primary : theme.icon}
        />
        {showFilterActive && filterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{filterCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.searchBar,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    height: 48,
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
    color: theme.icon,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.textPrimary,
  },
  clearButton: {
    padding: 8,
  },
  filterButton: {
    padding: 8,
    position: "relative",
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: `${theme.primary}40`,
  },
  filterBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: theme.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: theme.textPrimary,
    fontSize: 10,
    fontWeight: "bold",
  },
});
