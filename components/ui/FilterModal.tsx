import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getPriceRangeDescription } from "@/utils/utils";
import { theme } from "@/constants/theme";
import { PriceRange } from "@/types";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilter: PriceRange[];
  onFilterChange: (filter: PriceRange) => void;
  onApply?: () => void;
  onCancel?: () => void;
  multiSelect?: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  currentFilter,
  onFilterChange,
  onApply,
  onCancel,
  multiSelect = false,
}) => {
  const filters: PriceRange[] = [
    PriceRange.All,
    PriceRange.Low,
    PriceRange.Medium,
    PriceRange.High,
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter by Price</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome
                    name="times"
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.filterOptions}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterOption,
                      currentFilter.includes(filter) &&
                        styles.activeFilterOption,
                    ]}
                    onPress={() => onFilterChange(filter)}
                  >
                    <View style={styles.filterTextContainer}>
                      <Text
                        style={[
                          styles.filterText,
                          currentFilter.includes(filter) &&
                            styles.activeFilterText,
                        ]}
                      >
                        {filter}
                      </Text>
                      <Text style={styles.filterDescription}>
                        {getPriceRangeDescription([filter])}
                      </Text>
                    </View>
                    {currentFilter.includes(filter) && (
                      <FontAwesome
                        name="check"
                        size={18}
                        color={theme.iconActive}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {multiSelect && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onCancel}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.applyButton]}
                    onPress={onApply}
                  >
                    <Text style={[styles.buttonText, styles.applyButtonText]}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: theme.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.textPrimary,
  },
  closeButton: {
    padding: 5,
  },
  filterOptions: {
    marginBottom: 20,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: theme.searchBar,
  },
  filterTextContainer: {
    flex: 1,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.textPrimary,
    marginBottom: 4,
  },
  filterDescription: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  activeFilterOption: {
    backgroundColor: `${theme.primary}20`,
  },
  activeFilterText: {
    color: theme.primary,
  },
  checkIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: theme.border,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: theme.primary,
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: theme.textPrimary,
  },
  applyButtonText: {
    color: "#FFF",
  },
});

export default FilterModal;
