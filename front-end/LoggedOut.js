import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
import { AuthContext } from './AuthContext';
import SignupScreen from './screens/SignupScreen-1';
import LoginScreen from './screens/SignInScreen';
import { Colours } from "./constants/colours.js";

const AuthTab = createBottomTabNavigator();

export default function LoggedOut() {
    return (
      <AuthTab.Navigator
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
        }}>
        <AuthTab.Screen name="Signup" component={SignupScreen} 
        options={{title: 'Sign up', 
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person-add" activeTintColor="purple" />,}}/>
        <AuthTab.Screen name="Login" component={LoginScreen} 
        options={{title: 'Log in', 
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-log-in" activeTintColor="purple" />,}}/>
      </AuthTab.Navigator>
    )
  }