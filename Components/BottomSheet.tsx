import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link, useNavigation, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const { dismiss } = useBottomSheetModal();

  const gotoSearch = () => {
    dismiss(), router.push("/(modal)/location-search");
  };

  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.label}>Your Location</Text>
          <TouchableOpacity onPress={gotoSearch}>
            <View style={styles.item}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>Use current location</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.label}>Arrival time</Text>
          <Link href={"/"} asChild>
            <TouchableOpacity>
              <View style={styles.item}>
                <Ionicons
                  name="stopwatch-outline"
                  size={20}
                  color={Colors.medium}
                />
                <Text style={styles.itemText}>Now</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 30,
    borderRadius: 32,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleInactive: {
    padding: 8,
  },
  inactiveText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 16,
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  itemText: {
    flex: 1,
  },
});

export default BottomSheet;
