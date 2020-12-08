import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
// import RecipeScreen from './screens/RecipeScreen';
// import ProfileScreen from './screens/ProfileScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
// import TipsScreen from './screens/TipsScreen';
// import SavedRecipesScreen from './screens/SavedRecipesScreen';
import AboutUsScreen from './screens/AboutUsScreen';
// import SavedTipsScreen from './screens/SavedTipsScreen';

const Tab = createBottomTabNavigator();

export default function LoggedIn() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#098A00',
          inactiveTintColor: 'gray',
          style: {
            height: '12.5%',
        }
        }}
      >
        <Tab.Screen name="About Us" component={AboutUsScreen} 
          options={{title: 'About Us', 
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contacts" activeTintColor="purple" />,}}/>
        {/* <Tab.Screen name="Recipes" component={RecipeScreen} 
          options={{title: 'Recipes', 
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-restaurant"  activeTintColor="purple" />,}}/> */}
        <Tab.Screen name="Shopping List" component={ShoppingListScreen} 
          options={{title: 'Shopping List', 
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list-box" activeTintColor="purple"  />,}}/>
        {/* <Tab.Screen name="Tips" component={TipsScreen}
          options={{title: 'Tips', 
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-globe" activeTintColor="purple" />,}}/> */}
      </Tab.Navigator>
    )
  }