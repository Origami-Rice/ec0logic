import { AuthContext } from '../AuthContext';

const SignInScreen = ({navigation}) => {
    //....

    const { signIn } = React.useContext(AuthContext);

    //.... 
    // onPress of signin button can now access the
    // signIn() function in App.js
}