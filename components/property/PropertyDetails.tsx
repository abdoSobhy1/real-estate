import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { contactAgentViaWhatsApp, formatPrice } from "../../utils/utils";
import { theme } from "../../constants/theme";
import DetailsCarousel from "../ui/DetailsCarousel";
import { useFetchProperty } from "@/hooks/useFetchProperty";
import { PropertyDetailsShimmer } from "../ui/Shimmer";

const PropertyDetails: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const insets = useSafeAreaInsets();

  const { property, loading, error, fetchProperty } = useFetchProperty();

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id, fetchProperty]);

  const isFav = isFavorite(property?.id!);

  if (!loading && !property && error) {
    return (
      <View style={[styles.notFound, { paddingBottom: insets.bottom }]}>
        <Text style={styles.notFoundText}>
          Couldn&apos;t retrieve the property {error}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(property?.id!);
    } else {
      addFavorite(property?.id!);
    }
  };

  const contactAgent = () => {
    contactAgentViaWhatsApp("+201201725872", property?.title!);
  };

  if (!loading && property) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <DetailsCarousel images={property.images} loading={false} />

          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{property.title}</Text>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={toggleFavorite}
              >
                <FontAwesome
                  name={isFav ? "heart" : "heart-o"}
                  size={24}
                  color={isFav ? "#ff5a5f" : theme.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.location}>
              <FontAwesome name="map-marker" size={16} color={theme.icon} />{" "}
              {property.location}
            </Text>
            <Text style={styles.price}>{formatPrice(property.price)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomButtonContainer,
            { paddingBottom: insets.bottom },
          ]}
        >
          <TouchableOpacity style={styles.contactButton} onPress={contactAgent}>
            <FontAwesome name="whatsapp" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Agent</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <PropertyDetailsShimmer />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.background,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    color: theme.textPrimary,
  },
  backButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: theme.textPrimary,
    fontWeight: "500",
  },
  header: {
    marginTop: 16,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
    color: theme.textPrimary,
  },
  favoriteButton: {
    padding: 8,
  },
  location: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primaryLight,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: theme.surfaceElevated,
  },
  feature: {
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    color: theme.textSecondary,
  },
  priceRange: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  priceRangeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  lowPrice: {
    color: theme.success,
  },
  mediumPrice: {
    color: theme.warning,
  },
  highPrice: {
    color: theme.error,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.textPrimary,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.textSecondary,
  },
  contactButton: {
    backgroundColor: "#25D366", // WhatsApp green
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PropertyDetails;
