import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 11.9909423,
    longitude: 8.4547187,
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
  });
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <TouchableOpacity style={styles.boxIcon}>
            <Ionicons
              name="search-outline"
              size={24}
              color={Colors.medium}
            />
          </TouchableOpacity>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.lightGrey,
            paddingLeft: 40,
            borderRadius: 16,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
          },
        }}
      />

      <MapView style={styles.map} region={location} showsUserLocation={true} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  }
});
