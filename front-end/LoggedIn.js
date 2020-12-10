import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { Colours } from "./constants/colours.js";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InventoryAllFoods from "./screens/InventoryAllFoods";
import InventoryInputScreen from "./screens/InventoryInputScreen";
import FinishedFoodScreen from "./screens/FinishedFoodScreen";
import WastedFoodScreen from "./screens/WastedFoodScreen";

import ShoppingListScreen from "./screens/ShoppingListScreen";
import MyStatsScreen from "./screens/MyStatsScreen";
import EcoTipsScreen from "./screens/EcoTipsScreen";
import RecipesScreen from "./screens/RecipesScreen";
import EditInventoryItemScreen from "./screens/EditInventoryItemScreen";

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
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
const InventoryStack = createStackNavigator();

export default function InventoryStackNavigator () {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InventoryStack.Screen name="List" component={MainNavigation} />
      <InventoryStack.Screen name="Input" component={InventoryInputScreen} />
      <InventoryStack.Screen name="ThrownOut" component={WastedFoodScreen} />
      <InventoryStack.Screen name="Used" component={FinishedFoodScreen} />
      <InventoryStack.Screen
        name="Edit"
        component={EditInventoryItemScreen}
      />
    </InventoryStack.Navigator>
  );
}