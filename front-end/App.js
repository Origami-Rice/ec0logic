import * as React from "react";
import { LogBox, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import { AuthContext } from "./AuthContext";
import send from "./requests/request.js";
import InventoryAllFoods from "./screens/InventoryAllFoods";
import InventoryInputScreen from "./screens/InventoryInputScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import FinishedFoodScreen from "./screens/FinishedFoodScreen";
import WastedFoodScreen from "./screens/WastedFoodScreen";
import MyStatsScreen from "./screens/MyStatsScreen";
import EditInventoryItemScreen from './screens/EditInventoryItemScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { sign } from "crypto";

let customFonts = {
  Montserrat_600SemiBold: require("./fonts/Montserrat-SemiBold.ttf"),
};

// const AuthStack = createStackNavigator();

// function AuthStackScreen() {
//   return (
//     <AuthStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//         <AuthStack.Screen name="AuthTabs" component={AuthenticationTabs} />
//         {/* <AuthStack.Screen name="SignInScreen" component={SignInScreen}/>
//         <AuthStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
//     </AuthStack.Navigator>
//   );
// }

const AuthTab = createBottomTabNavigator();

function AuthenticationTabs() {
  return (
    <AuthTab.Navigator>
      <AuthTab.Screen
        name="Signup"
        component={SignUpScreen} // screen name may change and must be imported
      />
      <AuthTab.Screen
        name="Signin"
        component={SignInScreen} // screen name may change and must be imported
      />
    </AuthTab.Navigator>
  );
}

const InventoryStack = createStackNavigator();
// perhaps change variable names and reorganize into two separate stacks
// user stack and inventory stack??
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
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); // testing
  
  
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsSignedIn(true);
      },
      signUp: () => {
        setIsSignedIn(true);
      },
      signOut: () => {
        setIsSignedIn(false);
      }
    }
  });

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // // does this need to be inside of useEffect??????
  // // useEffect(() => {
  // //   // place fetch here ????????????????????????/
  // // }, []);

  // // send("getAuthenticated", {})
  // // .then(response => response.json())
  // // .then(session => {
  // //   if (session.isauth) {
  // //     setIsSignedIn(true);
  // //   }
  // //   console.log('AUTH SESSION:', session);
  // //   setIsLoading(false); // needed ?????????????????????????????????????????????????????
  // // })
  // // .catch(err => console.log('Error getting session:', err));

  // const authContext = React.useMemo(() => {
  //   // Im not sure why these are being marked as unused even
  //   // though the buttons in the SignUpScreen and SignInScreen
  //   // are using them. We may need to figure out how the useMemo
  //   // and useContext hooks actually work.
  //   signIn: ({username, password}) => {
  //     // fetch the result from the signin endpoint, process
  //     // it and set the necessary states
  //     const data = {
  //       username: username,
  //       password: password
  //     };

  //     send("signinUser", data)
  //     .then(result => {
  //       if (result.status === 200) {
  //         result.json().then(json => {
  //           console.log(json)
  //           console.log('Signed in as', json.username)
  //           setIsSignedIn(true)
  //           // setIsLoading(false); // needed ?????????????????????????????????????????????????????
  //           console.log("SIGN_IN auth:", isSignedIn)
  //         }).catch(err => {
  //           console.log('JSON parse error');
  //         });
  //       } else {
  //         console.log ('Incorrect username or password')
  //         alert("Incorrect email or password")
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Session login error', err)
  //     })
  //   };

  //   signOut: () => {
  //     // fetch the result from the signout endpoint, process
  //     // it and set the necessary states
  //     send("signoutUser", {})
  //     .then(result => {
  //       if (result.status === 200) {
  //         result.json().then(json => {
  //           console.log(json)
  //           console.log('Logged out')
  //           setIsLoggedIn(false)
  //           console.log("SIGN_OUT auth:", isSignedIn)
  //         }).catch(err => {
  //           console.log('JSON parse error');
  //         });
  //       } else {
  //         console.log('Logout failed:', result.status)
  //       }
  //     }).catch(err => {
  //       console.log('Session signout error', err)
  //     })
  //   };

  //   signUp: ({ email, firstName, lastName, password, confirmPassword, checked }) => {
  //     if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
  //       alert('Please enter a valid email');
  //     } else if (firstName.length < 2 || lastName.length < 2) {
  //       alert('Please enter a valid name');
  //     } else if (password.length < 6) {
  //       alert('Password must be at least 6 characters');
  //     } else if (password !== confirmPassword) {
  //       alert('Passwords do not match');
  //     } else {
  //       // fetch the result from the signout endpoint, process
  //       // it and set the necessary states
  //       const data = {
  //         firstname: firstName,
  //         lastname: lastName,
  //         email: email.toLowerCase(),
  //         username: email.toLowerCase(),
  //         password: password
  //       }
  //       send("signupUser", data)
  //       .then(result => {
  //         return result.json();
  //       })
  //       .then(result => {
  //         if (result.status === 409) {
  //           alert('Email already in use.');
  //         } else if (result.status === 200) {
  //           setIsSignedIn(true);
  //           // setIsLoading(false); // is needed ?????????????????????????????????????????????????????
  //           console.log("SIGN_UP auth:", isSignedIn)
  //         } else {
  //           console.log(result.error);
  //         }
  //       })
  //       .catch(err => {
  //         console.log('Signup error', err)
  //       })
  //     }
  //   };
  // }, []); // is [] needed ?????????????????????????????????????????????????????

  // if( isLoading ) { // or display splash screen with return <screen name/>;
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }
  
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
        {isSignedIn ? (
          <InventoryStackScreen />
        ) : (
          <AuthenticationTabs />
        )}
    </NavigationContainer>
    </AuthContext.Provider>
  );

  // // old navigation
  // return (
  //   <NavigationContainer>
  //     {LogBox.ignoreAllLogs() }
  //     <InventoryStackScreen />
  //   </NavigationContainer>
  // );
}
