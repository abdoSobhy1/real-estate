import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { theme } from "../../constants/theme";

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, [animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedValue.value,
      [0, 0.5, 1],
      [0.3, 0.7, 0.3]
    );
    return {
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.shimmerContainer,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};

// Property Card Shimmer
export const PropertyCardShimmer: React.FC = () => {
  const { width } = Dimensions.get("window");
  const CARD_MARGIN = 8;
  const CARD_WIDTH = (width - CARD_MARGIN * 6) / 2;

  return (
    <View
      style={[styles.cardShimmer, { width: CARD_WIDTH, margin: CARD_MARGIN }]}
    >
      <Shimmer width="100%" height={140} borderRadius={0} />
      <View style={styles.cardDetailsShimmer}>
        <Shimmer
          width="90%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 8 }}
        />
        <Shimmer
          width="70%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 8 }}
        />
        <Shimmer width="60%" height={14} borderRadius={4} />
      </View>
    </View>
  );
};

// Individual Card Shimmer (for use in lists)
export const CardShimmer: React.FC<{ width?: number }> = ({
  width: cardWidth,
}) => {
  const { width: screenWidth } = Dimensions.get("window");
  const CARD_MARGIN = 8;
  const finalWidth = cardWidth || (screenWidth - CARD_MARGIN * 6) / 2;

  return (
    <View
      style={[styles.cardShimmer, { width: finalWidth, margin: CARD_MARGIN }]}
    >
      <Shimmer width="100%" height={140} borderRadius={0} />
      <View style={styles.cardDetailsShimmer}>
        <Shimmer
          width="90%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 8 }}
        />
        <Shimmer
          width="70%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 8 }}
        />
        <Shimmer width="60%" height={14} borderRadius={4} />
      </View>
    </View>
  );
};

// Search Bar Shimmer
export const SearchBarShimmer: React.FC = () => {
  return (
    <View style={styles.searchBarShimmer}>
      <Shimmer width="100%" height={48} borderRadius={12} />
    </View>
  );
};

// Filter Pills Shimmer
export const FilterPillsShimmer: React.FC = () => {
  return (
    <View style={styles.filterPillsShimmer}>
      <Shimmer
        width={80}
        height={32}
        borderRadius={20}
        style={{ marginRight: 8 }}
      />
      <Shimmer
        width={100}
        height={32}
        borderRadius={20}
        style={{ marginRight: 8 }}
      />
      <Shimmer width={90} height={32} borderRadius={20} />
    </View>
  );
};

// Carousel Shimmer
export const CarouselShimmer: React.FC = () => {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.carouselShimmer}>
      <Shimmer width={width} height={250} borderRadius={0} />
    </View>
  );
};

// Property Details Shimmer
export const PropertyDetailsShimmer: React.FC = () => {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.detailsShimmer}>
      {/* Image carousel shimmer */}
      <Shimmer width={width} height={250} borderRadius={0} />

      {/* Header section shimmer */}
      <View style={styles.headerShimmer}>
        <Shimmer
          width="85%"
          height={22}
          borderRadius={4}
          style={{ marginBottom: 12 }}
        />
        <Shimmer
          width="60%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 12 }}
        />
        <Shimmer width="40%" height={24} borderRadius={4} />
      </View>

      {/* Description section shimmer */}
      <View style={styles.sectionShimmer}>
        <Shimmer
          width="30%"
          height={18}
          borderRadius={4}
          style={{ marginBottom: 12 }}
        />
        <Shimmer
          width="100%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 6 }}
        />
        <Shimmer
          width="100%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 6 }}
        />
        <Shimmer
          width="100%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 6 }}
        />
        <Shimmer width="80%" height={16} borderRadius={4} />
      </View>

      {/* Add bottom padding for fixed button */}
      <View style={{ height: 80 }} />

      {/* Fixed contact button shimmer at bottom */}
      <View style={styles.fixedContactButtonShimmer}>
        <Shimmer width="100%" height={50} borderRadius={12} />
      </View>
    </View>
  );
};

// Property List Shimmer
export const PropertyListShimmer: React.FC = () => {
  return (
    <View style={styles.listShimmer}>
      <SearchBarShimmer />
      <FilterPillsShimmer />
      <View style={styles.cardsGrid}>
        {Array.from({ length: 6 }, (_, index) => (
          <PropertyCardShimmer key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerContainer: {
    backgroundColor: theme.surfaceHighlight,
    overflow: "hidden",
  },
  shimmer: {
    backgroundColor: theme.surfaceElevated,
    flex: 1,
  },
  cardShimmer: {
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDetailsShimmer: {
    padding: 12,
  },
  searchBarShimmer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  filterPillsShimmer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  detailsShimmer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerShimmer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  sectionShimmer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  contactButtonShimmer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  fixedContactButtonShimmer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  listShimmer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  carouselShimmer: {
    width: "100%",
    height: 250,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 8,
  },
});
