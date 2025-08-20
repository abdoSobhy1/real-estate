import { Linking, Platform } from "react-native";
import { PriceRange, Property } from "../types";

/**
 * Price range utilities
 */
export const PRICE_RANGES: Record<
  PriceRange,
  { min: number; max: number | null }
> = {
  [PriceRange.Low]: { min: 0, max: 300000 },
  [PriceRange.Medium]: { min: 300000, max: 600000 },
  [PriceRange.High]: { min: 600000, max: null },
  [PriceRange.All]: { min: 0, max: null },
};

/**
 * Get the description for a price range
 */
export const getPriceRangeDescription = (ranges: PriceRange[]): string => {
  const descriptions: Record<PriceRange, string> = {
    [PriceRange.Low]: "Under $300K",
    [PriceRange.Medium]: "$300K - $600K",
    [PriceRange.High]: "Over $600K",
    [PriceRange.All]: "All Prices",
  };

  return ranges.map((range) => descriptions[range]).join(", ");
};

/**
 * Filter properties by price range
 */
export const filterPropertiesByPriceRange = (
  properties: Property[],
  priceRanges: PriceRange[]
): Property[] => {
  // If "All" is selected or no filters are applied, return all properties
  if (priceRanges.includes(PriceRange.All) || priceRanges.length === 0) {
    return properties;
  }

  // Filter properties based on selected price ranges
  return properties.filter((property) => {
    return priceRanges.some((range) => {
      const { min, max } = PRICE_RANGES[range];
      return property.price >= min && (max === null || property.price <= max);
    });
  });
};

/**
 * Text formatting utilities
 */
export const formatPrice = (price: number, currency: string = "$"): string => {
  return `${currency}${price.toLocaleString()}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Contact utilities
 */
export const contactAgentViaWhatsApp = async (
  phoneNumber: string,
  property: string
): Promise<void> => {
  const message = `Hi, I'm interested in the property: ${property}`;
  let url = "";
  if (Platform.OS === "android") {
    url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  } else {
    url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  }

  try {
    // Check if WhatsApp can be opened
    const canOpenWhatsApp = await Linking.canOpenURL(url);

    if (canOpenWhatsApp) {
      await Linking.openURL(url);
    } else {
      console.log("WhatsApp is not installed");
      // Fallback to SMS
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      await Linking.openURL(smsUrl);
    }
  } catch (error) {
    console.error("Failed to contact agent:", error);
  }
};
