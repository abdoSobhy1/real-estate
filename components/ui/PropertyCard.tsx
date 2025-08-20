import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";
import { Property } from "../../types";
import { formatPrice } from "../../utils/utils";
import { theme } from "../../constants/theme";
import { Shimmer } from "./Shimmer";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const router = useRouter();
  const isFav = isFavorite(property.id);
  const [imageLoading, setImageLoading] = useState(true);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(property.id);
    } else {
      addFavorite(property.id);
    }
  };

  const handleCardPress = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCardPress}>
      <View style={styles.card}>
        {imageLoading && (
          <View style={styles.imageShimmer}>
            <Shimmer width="100%" height={140} borderRadius={0} />
          </View>
        )}
        <Image
          source={{ uri: property.images[0] }}
          style={[styles.image, imageLoading && styles.hiddenImage]}
          contentFit="cover"
          transition={200}
          onLoad={() => setImageLoading(false)}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          <FontAwesome
            name={isFav ? "heart" : "heart-o"}
            size={24}
            color={isFav ? "#ff5a5f" : "#ffffff"}
          />
        </TouchableOpacity>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {property.title}
          </Text>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
          <View style={styles.location}>
            <FontAwesome
              name="map-marker"
              size={14}
              color={theme.textTertiary}
            />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 6) / 2;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    margin: CARD_MARGIN,
    width: CARD_WIDTH,
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 140,
    width: "100%",
  },
  imageShimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    zIndex: 1,
  },
  hiddenImage: {
    opacity: 0,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  details: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.primaryLight,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.textPrimary,
    lineHeight: 20,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  locationText: {
    fontSize: 13,
    color: theme.textSecondary,
    marginLeft: 4,
  },
});

export default PropertyCard;
