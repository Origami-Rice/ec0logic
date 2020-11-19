import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import InventoryAllFoodsScreen from "./screens/InventoryAllFoodsScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";

const Tab = createBottomTabNavigator();

let customFonts = {
  Montserrat_600SemiBold: require("./fonts/Montserrat-SemiBold.ttf"),
};

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
      <MyTabs />
    </NavigationContainer>
  );
}
