import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, LogBox } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';
import send from './requests/request';
import LoggedInNavigator from './LoggedIn';
import LoggedOutNavigator from './LoggedOut';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

export default function App (props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState("");

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          Montserrat_500Medium: require('./fonts/Montserrat-SemiBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();

  }, []);


  send("getAuthenticated", {})
    .then(response => response.json())
    .then(session => {
      if (session.isauth) {
        setIsLoggedIn(true);
        setUser(session.username);
      }
      console.log('AUTH SESSION:', session)
    }).catch(err => console.log('Error getting session:', err));

  const authContext = React.useMemo(() => {
    return {

      signIn: ({ email, password }) => {

        console.log(email, password);
        const data = {
          username: email.toLowerCase(),
          password: password.toLowerCase(),
        };

        send("signinUser", data)
        .then(result => {
          if (result.status === 200) {
            result.json().then(json => {
              console.log(json);
              console.log('Logged in as', data.username);
              setIsLoggedIn(true);
              setUser(data.username);
              console.log("SIGN_IN auth:", isLoggedIn);
            }).catch(err => {
              console.log('JSON parse error');
            });
          } else {
            console.log ('Incorrect username or password')
            alert("Incorrect email or password")
          }
        }).catch(err => {
          console.log('Session login error', err)
        })
      },

      signOut: () => {
        send("signoutUser", {})
        .then(result => {
          if (result.status === 200) {
            result.json().then(json => {
              console.log(json)
              console.log('Logged out')
              setIsLoggedIn(false)
              console.log("SIGN_OUT auth:", isLoggedIn)
            }).catch(err => {
              console.log('JSON parse error');
            });
          } else {
            console.log('Logout failed:', result.status)
          }
        }).catch(err => {
          console.log('Session logout error', err)
        })
      },

      signUp: ({ email, firstName, 
        lastName, password, 
        securityQuestion, securityAnswer }) => {
        
        const data = {
          firstname: firstName,
          lastname: lastName,
          email: email.toLowerCase(),
          username: email.toLowerCase(),
          password: password,
          question: securityQuestion,
          answer: securityAnswer
        };

          send("signupUser", data)
          .then(res => {
            return res.json()
          }).then(res => {
            console.log(res)
            if (res.error === "User with this username already exists") {
              alert("Email already in use")
            } else {
              setIsLoggedIn(true);
              setUser(username);
              console.log("SIGN_UP auth:", isLoggedIn);
            }
          })
      },
      
      updateUser: ({ newEmail, prev }) => {

        const data = {
          email: newEmail.toLowerCase(), 
        }
        console.log("About to", prev)
        send("updateEmail", data, "/" + prev)
        .then(response => response.json())
        .then(json => {
          if (json.message) {
            console.log("Username changed", newEmail.toLowerCase());
            setUser(newEmail.toLowerCase());
            return true;
          } else {
            console.log(json);
            return false; 
          } 
        })
        .catch(err => console.log(err))

      },

    };
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={{authContext, user: user}} style={styles.container}>
        <View style={styles.container}>
        {/* {LogBox.ignoreAllLogs() } */}
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {isLoggedIn ? (
                <RootStack.Screen name="LoggedIn" component={LoggedInNavigator} />
              ) : (
                <RootStack.Screen name="LoggedOut" component={LoggedOutNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
         </View>
      </AuthContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
});
