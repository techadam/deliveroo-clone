import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import ParallaxScrollView from "@/Components/ParallaxScrollView";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const { items, total } = useBasketStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundButton}
          >
            <Ionicons name="share-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundButton}
          >
            <Ionicons name="search-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={{ pathname: "/(modal)/dish", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>${item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImg} />
      </TouchableOpacity>
    </Link>
  );

  const selectCategry = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected.measure((px, py, x, y) => {
      scrollRef.current?.scrollTo({ x: x, y: y, animated: true });
    });
  };

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
      opacity.value = 1;
    } else {
      opacity.value = 0;
    }
  };

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        backgroundColor={`#fff`}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        contentBackgroundColor={Colors.lightGrey}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ width: "100%", height: 250 }}
          />
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDesc}>
            {restaurant.delivery} -{" "}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? " . " : ""}`
            )}
          </Text>
          <Text style={styles.restaurantDesc}>{restaurant.about}</Text>

          <SectionList
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item}-${index}`}
            sections={DATA}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.grey,
                  marginHorizontal: 16,
                }}
              ></View>
            )}
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
            )}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              alignItems: "center",
              gap: 12,
            }}
          >
            {restaurant.food.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
                onPress={() => selectCategry(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer Basket */}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Link href={"/basket"} asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{items}</Text>
                <Text style={styles.footerText}>View Basket</Text>
                <Text style={styles.basketTotal}>${total}</Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 16,
  },
  stickySection: {
    backgroundColor: "#fff",
    paddingLeft: 70,
    height: 87,
    justifyContent: "flex-end",
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
    marginBottom: 12,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  restaurantDesc: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.medium,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    gap: 10,
  },
  dishImg: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  stickySegments: {
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    overflow: "hidden",
  },
  segmentShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: "#fff",
    height: 48,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    fontSize: 16,
    color: Colors.mediumDark,
    fontWeight: "bold",
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 12,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  basket: {
    color: "#fff",
    backgroundColor: "#19AA86",
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontWeight: "bold",
  },
  basketTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    gap: 12,
  },
});
