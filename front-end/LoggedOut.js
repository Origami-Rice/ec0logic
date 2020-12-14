import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './screens/SignupScreen';
import SignInScreen from './screens/SignInScreen';
import { Colours } from "./constants/colours.js";

const AuthTab = createBottomTabNavigator();

export default function LoggedOutNavigator () {
    return (
      <AuthTab.Navigator
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
          fontFamily: 'Montserrat_600SemiBold',
        },
      }}>
      <AuthTab.Screen
      
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="md-person-add"
              color={color}
              size={size}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
      <AuthTab.Screen
        name="Login"
        component={SignInScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="md-log-in"
              color={color}
              size={size}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
    </AuthTab.Navigator>
    )
  }