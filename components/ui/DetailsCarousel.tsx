import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import { CarouselShimmer } from "./Shimmer";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  loop?: boolean;
  loading?: boolean;
}

const width = Dimensions.get("window").width;

const DetailsCarousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  loop = true,
  loading = false,
}) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  if (loading) {
    return <CarouselShimmer />;
  }

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <Image
        source={{ uri: item }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
    );
  };

  const isOneImage = images.length === 1;

  return (
    <View style={styles.container}>
      {isOneImage ? (
        <Image
          source={{ uri: images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <>
          <Carousel
            ref={ref}
            width={width}
            height={250}
            data={images}
            renderItem={renderItem}
            autoPlay={autoPlay}
            autoPlayInterval={5000}
            loop={loop}
            onProgressChange={progress}
            pagingEnabled
            snapEnabled
          />
          <Pagination.Basic
            progress={progress}
            data={images}
            dotStyle={{ backgroundColor: theme.icon, borderRadius: 50 }}
            activeDotStyle={{
              backgroundColor: theme.iconActive,
              borderRadius: 50,
            }}
            containerStyle={{ gap: 5, marginTop: 10 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default DetailsCarousel;
