import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

const Dish = () => {
  const { id } = useLocalSearchParams();
  const item = getDishById(+id!)!;
  const router = useRouter();
  const { addProduct } = useBasketStore();

  const addToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
    addProduct(item)
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <Animated.Image
          source={item?.img}
          style={styles.image}
          entering={FadeIn.duration(500).delay(300)}
        />

        <View style={{ padding: 20 }}>
          <Animated.Text
            style={styles.dishName}
            entering={FadeInLeft.duration(500).delay(350)}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            style={styles.dishInfo}
            entering={FadeInLeft.duration(500).delay(360)}
          >
            {item?.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => addToCart()}
          >
            <Text style={styles.footerText}>Add for ${item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dishInfo: {
    fontSize: 16,
    color: Colors.mediumDark,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
