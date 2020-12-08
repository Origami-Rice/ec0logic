import * as React from 'react';
import { Image, StyleSheet, Text, ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

export default function SignupScreen() {

  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  // const [checked, setChecked] = React.useState(false);
  // const [experience, setExperience] = React.useState(null); // removed experience

  const { signUp } = React.useContext(AuthContext);

  return (
    <ScrollView style={{ width: '100%', height: '100%' }}>

        <View style={styles.headerContainer}>
          <Image source={require('../assets/wasteless-logo.png')} style={styles.headerImage}/>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.signupHeaderText}>Sign Up Below</Text>
        </View>

        <TextInput
          style={styles.signupInputText}
          autoCorrect={false}
          underlineColor="#FFF"
          theme={{ colors: { placeholder: '#FFF', text: '#FFF', primary: '#FFF'}}}
          label='Email'
          onChangeText={ setEmail }
        />
        
        <View style={styles.signupInputRow}>

          <View style={styles.signupFirstName}>
            <TextInput
              style={{backgroundColor: "rgba(0,0,0,0)"}}
              autoCorrect={false}
              label='First Name'
              underlineColor="#FFF"
              theme={{ colors: { placeholder: '#FFF', text: '#FFF', primary: '#FFF'}}}
              onChangeText={ setFirstName }
            />
          </View>

          <View style={styles.signupLastName}>
            <TextInput
              style={{backgroundColor: "rgba(0,0,0,0)"}}
              autoCorrect={false}
              underlineColor="#FFF"
              theme={{ colors: { placeholder: '#FFF', text: '#FFF', primary: '#FFF'}}}
              label='Last Name'
              onChangeText={ setLastName }
            />
          </View>

        </View>

        {/* TODO: implement password show/hide */}
        <TextInput
          style={styles.signupInputText}
          secureTextEntry={true}
          autoCorrect={false}
          underlineColor="#FFF"
          theme={{ colors: { placeholder: '#FFF', text: '#FFF', primary: '#FFF'}}}
          label='Password'
          onChangeText={ setPassword }
        />

        <TextInput
          style={styles.signupInputText}
          secureTextEntry={true}
          autoCorrect={false}
          label='Confirm Password'
          underlineColor="#FFF"
          theme={{ colors: { placeholder: '#FFF', text: '#FFF', primary: '#FFF'}}}
          onChangeText={ setConfirmPassword }
        />

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By signing up, you agree to our terms and conditions.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained"
            style={styles.signupButton}
            onPress={() => signUp(
              { email, firstName, lastName, password, confirmPassword, checked, experience }
            )}
          >
              Sign Up
          </Button>
        </View>

      </ScrollView>

  );
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  headerImage: {
    width: 242,
    height: 200,
  },
termsContainer: {
  marginHorizontal: 50,
  paddingTop: 20,
  // marginHorizontal: 50,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  color: 'white',

},
termsText: {
  textAlign: "center",
  color: 'white',
},
dropdownContainer:{
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
},
rowContainer: {
  flex: 1,
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center', 
  alignItems: 'center',
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
    color: 'white',
    textAlign: 'center',
  },
  signupInputText: {
    backgroundColor: "rgba(0,0,0,0)",
    marginHorizontal: 25,
    marginVertical: 10,
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
  },
  signupLastName: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 25,
    paddingVertical: 10,
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
