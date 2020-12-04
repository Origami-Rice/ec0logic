import { AuthContext } from '../AuthContext';

const SignUpScreen = ({navigation}) => {
    //....

    const { signUp } = React.useContext(AuthContext);

    //.... 
    // onPress of signUp button can now access the
    // signUp() function in App.js
}