import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import InventoryAllFoods from "./screens/InventoryAllFoods";
import InventoryInputScreen from "./screens/InventoryInputScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import FinishedFoodScreen from "./screens/FinishedFoodScreen";
import WastedFoodScreen from "./screens/WastedFoodScreen";

let customFonts = {
  Montserrat_600SemiBold: require("./fonts/Montserrat-SemiBold.ttf"),
};

const InventoryStack = createStackNavigator();

function InventoryStackScreen() {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InventoryStack.Screen name="List" component={MyTabs} />
      <InventoryStack.Screen name="Input" component={InventoryInputScreen} />
      <InventoryStack.Screen name="ThrownOut" component={WastedFoodScreen} />
      <InventoryStack.Screen name="Used" component={FinishedFoodScreen} />
    </InventoryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#828282",
        inactiveTintColor: "#BDBDBD",
        activeBackgroundColor: "#E5E5E5",
        inactiveBackgroundColor: "#ffffff",
        style: { borderTopWidth: 0, height: 60 },
        labelStyle: {
          marginBottom: 10,
          fontSize: 10,
          fontFamily: "Montserrat_600SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryAllFoods}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="kitchen"
              color={color}
              size={size}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="shopping-cart"
              color={color}
              size={size}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <InventoryStackScreen />
    </NavigationContainer>
  );
}
