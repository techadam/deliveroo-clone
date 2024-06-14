import CustomHeader from "@/Components/CustomHeader";
import Colors from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/location-search"
            options={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
              headerTitle: "Select location",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/details"
            options={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
              headerTitle: "Details",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="(modal)/dish"
            options={{
              animation: "slide_from_bottom",
              presentation: "modal",
              headerTitle: "",
              headerTitleAlign: "center",
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={{backgroundColor: '#fff', borderRadius: 20, padding: 6}}
                >
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="basket"
            options={{
              headerTitle: "Basket",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
