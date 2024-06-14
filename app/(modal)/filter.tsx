import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = ({ handlePress = () => {} }) => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <View style={{ flex: 1 }}>
          <Text>Sort</Text>
          <Text>Recommended</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <View style={{ flex: 1 }}>
          <Text>Hygiene rating</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <View style={{ flex: 1 }}>
          <Text>Offers </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <View style={{ flex: 1 }}>
          <Text>Dietary </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>

    <View
      style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}
    >
      <Text style={styles.header}>Categories</Text>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
          Clear all
        </Text>
      </TouchableOpacity>
    </View>
  </>
);

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <View>
        <BouncyCheckbox
          size={25}
          fillColor={Colors.primary}
          unFillColor="#FFFFFF"
          iconStyle={{
            borderColor: Colors.primary,
            borderRadius: 4,
            borderWidth: 2,
          }}
          innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
          isChecked={item.checked}
          onPress={() => {
            const isChecked = items[index].checked;
            const updatedItems = items.map((item) => {
              if (item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });

            setItems(updatedItems);
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox handlePress={() => handleClearAll()} />}
        ListFooterComponent={() => <View style={{ height: 80 }}></View>}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingRight: 0,
    backgroundColor: "#fff",
  },
  itemText: {
    flex: 1,
  },
});
