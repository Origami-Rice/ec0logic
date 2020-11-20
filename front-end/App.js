import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import InventoryAllFoodsScreen from "./screens/InventoryAllFoodsScreen";
import InventoryInputScreen from "./screens/InventoryInputScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";

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
        style: { marginBottom: 10, fontSize: 20 },
        labelStyle: { fontSize: 10, fontFamily: "Montserrat_600SemiBold" },
      }}
    >
      <Tab.Screen name="Inventory" component={InventoryAllFoodsScreen} />
      <Tab.Screen name="Shopping" component={ShoppingListScreen} />
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
