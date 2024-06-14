import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import SwipeableRow from "@/Components/Swipeable";

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}

      {order && (
        <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Thank you for your order!
          </Text>
          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.footerText}>New order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={() => (
              <Text style={styles.section}>Items</Text>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
            )}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 18 }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              </SwipeableRow>
            )}
            ListFooterComponent={() => (
              <View>
                <View
                  style={{ height: 1, backgroundColor: Colors.grey }}
                ></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>${total}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service Fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.service}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery Fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Total</Text>
                  <Text style={{ fontSize: 18 }}>
                    ${FEES.delivery + FEES.service + total}
                  </Text>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
              <Link href={"/basket"} asChild>
                <TouchableOpacity
                  style={styles.fullButton}
                  onPress={startCheckout}
                >
                  <Text style={styles.footerText}>Order now</Text>
                </TouchableOpacity>
              </Link>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

export default Basket;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
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
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 50,
    marginTop: 16,
  },
});
