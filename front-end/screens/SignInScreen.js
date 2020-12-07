import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from 'react-native';
import { AuthContext } from '../AuthContext';


export default function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const { signIn } = React.useContext(AuthContext);

  return (
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.titleContainer}>
          <Text style={styles.loginHeaderText}>Log In Below</Text>
        </View>
        <TextInput
          style={styles.loginInputText}
          autoCorrect={false}
          label='Email'
          underlineColor="#FFF"
          placeholder="Username"
          onChangeText={ setUsername }
        />
        {/* TODO: implement password show/hide */}
        <TextInput
          style={styles.loginInputText}
          secureTextEntry={true}
          autoCorrect={false}
          label='Password'
          underlineColor="#FFF"
          placeholder="Password"
          onChangeText={ setPassword }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => signIn({ username, password })}>
            <Text style={styles.loginHeaderText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

  
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    fontFamily: 'roboto-regular',
  },
  loginHeaderText: {
    paddingBottom: 20,
    fontFamily: 'roboto-regular',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  loginInputText: {
    backgroundColor: "rgba(0,0,0,0)",
    marginHorizontal: 25,
    marginVertical: 10,
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },  
  loginButton: {
    paddingTop: 5,
    width: 131,
    height: 50,
    backgroundColor: '#098A00',
  },
});