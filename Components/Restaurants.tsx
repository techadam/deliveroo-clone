import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={"/(modal)/details"} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={restaurant.img} style={styles.image} />
              <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>{restaurant.name}</Text>
              <Text style={{color: Colors.green}}>{restaurant.rating} {restaurant.ratings}</Text>
              <Text style={{color: Colors.medium}}>{restaurant.rating} {restaurant.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.mediumDark,
  },
  imageContainer: {},
  image: {
    flex: 6,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 3,
    padding: 10,
  }
});
