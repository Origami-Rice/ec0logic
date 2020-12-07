import * as React from "react";
import { Colours } from "./Constants/colours.js";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";

import InventoryAllFoods from "./screens/InventoryAllFoods";
import InventoryInputScreen from "./screens/InventoryInputScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import FinishedFoodScreen from "./screens/FinishedFoodScreen";
import WastedFoodScreen from "./screens/WastedFoodScreen";
import MyStatsScreen from "./screens/MyStatsScreen";
import EcoTipsScreen from "./screens/EcoTipsScreen";
import RecipesScreen from "./screens/RecipesScreen";
import EditInventoryItemScreen from "./screens/EditInventoryItemScreen";
import AboutUsScreen from "./screens/AboutUsScreen";

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
      <InventoryStack.Screen name="Edit" component={EditInventoryItemScreen} />
      <InventoryStack.Screen name="About" component={AboutUsScreen} />
    </InventoryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colours.navActiveTint,
        inactiveTintColor: Colours.navInactiveTint,
        activeBackgroundColor: Colours.navActiveBackground,
        inactiveBackgroundColor: Colours.navInactiveBackground,
        style: { borderTopWidth: 0, height: 60 },
        labelStyle: {
          marginBottom: 10,
          fontSize: 10,
          fontFamily: "Montserrat_600SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="My Stats"
        component={MyStatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="assessment"
              color={color}
              size={size}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
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
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="description"
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
      <Tab.Screen
        name="Eco Tips"
        component={EcoTipsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="earth"
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
      {LogBox.ignoreAllLogs()}
      <InventoryStackScreen />
    </NavigationContainer>
  );
}
