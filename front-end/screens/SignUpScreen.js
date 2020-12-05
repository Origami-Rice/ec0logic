// import { AuthContext } from '../AuthContext';

// const SignUpScreen = ({navigation}) => {
//     //....

//     const { signUp } = React.useContext(AuthContext);

//     //.... 
//     // onPress of signUp button can now access the
//     // signUp() function in App.js
// }

import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../AuthContext';

export default function SignupScreen() {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (
    <ScrollView style={{ width: '100%', height: '100%' }}>
      <View style={styles.titleContainer}>
        <Text style={styles.signupHeaderText}>Sign Up Below</Text>
      </View>
      <TextInput
        style={styles.signupInputText}
        autoCorrect={false}
        underlineColor="#FFF"
        placeholder="Email"
        onChangeText={setEmail}
      />
      <View style={styles.signupInputRow}>
        <View style={styles.signupFirstName}>
          <TextInput
            style={{ backgroundColor: 'rgba(0,0,0,0)' }}
            autoCorrect={false}
            placeholder="First Name"
            underlineColor="#FFF"
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.signupLastName}>
          <TextInput
            style={{ backgroundColor: 'rgba(0,0,0,0)' }}
            autoCorrect={false}
            underlineColor="#FFF"
            placeholder="Last Name"
            onChangeText={setLastName}
          />
        </View>
      </View>
      {/* TODO: implement password show/hide */}
      <TextInput
        style={styles.signupInputText}
        secureTextEntry={true}
        autoCorrect={false}
        underlineColor="#FFF"
        placeholder="Password"
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.signupInputText}
        secureTextEntry={true}
        autoCorrect={false}
        placeholder="Confirm Password"
        underlineColor="#FFF"
        onChangeText={setConfirmPassword}
      />
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you agree to our terms and conditions.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() =>
            signUp({
              email,
              firstName,
              lastName,
              password,
              confirmPassword,
            })
          }>
          <Text style={[styles.signupHeaderText, {color: "white"}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  termsContainer: {
    marginHorizontal: 50,
    paddingTop: 20,
    // marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  termsText: {
    textAlign: 'center',
    color: 'black',
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    fontFamily: 'roboto-regular',
    color: '#727272',
  },
  signupHeaderText: {
    paddingBottom: 20,
    fontFamily: 'roboto-regular',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  signupInputText: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginHorizontal: 25,
    marginVertical: 10,
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  signupInputRow: {
    flexDirection: 'row',
    flex: 1,
  },
  signupFirstName: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 5,
    paddingVertical: 10,
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  signupLastName: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 25,
    paddingVertical: 10,
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  signupButton: {
    paddingTop: 5,
    width: 131,
    height: 50,
    backgroundColor: '#098A00',
  },
});