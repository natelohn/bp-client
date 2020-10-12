import { AsyncStorage } from 'react-native';
import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { sendServerAlert, showOTPError } from '../components/Alerts'


const authReducer = (state, {type, userId}) => {
  switch (type) {
      case 'signin':
          return {...state, userId };
      case 'signout':
          return {...state, userId: null };
      default:
          return state;
  }
};

const signup = dispatch => async ({ username, phone, otp }, signUpCallback, subButtonPressed, reinitVerification) => {
    // Send sign up data to the server and get a token and id
    signUpCallback({ 
        variables: { username, phone, otp  },
    })
    .then( async ({data}) => {
        // if success -> go to home screen
        if (data.register.accessToken) {
            // Persist the token in local storage     
            await AsyncStorage.setItem('jwt', data.register.accessToken);
            // Update state & direct to home screen
            dispatch({ type: 'signin', userId: data.register.userId });
            navigate('Home');
        } 
        // Handle errors if sign up failed
        else {
            showOTPError(phone, subButtonPressed, reinitVerification);
        }
    })
    // if failure -> send server issue error
    .catch(() => { sendServerAlert() });
};

const login = dispatch => async ({ phone, otp }, loginCallback, subButtonPressed, reinitVerification) => {
    // Verify inputs with server
    loginCallback({ 
        variables: { phone, otp },
    })
    .then(async ({data}) => {
        // if success -> go to home screen
        if (data.login.accessToken) {
            // Persist the token in local storage
            await AsyncStorage.setItem('jwt', data.login.accessToken);
            // Update state to direct to home screen
            dispatch({ type: 'signin', userId: data.login.userId });
            navigate('Home');
        } 
        // Handle errors if login failed
        else {
            showOTPError(phone, subButtonPressed, reinitVerification);
        }
    })
    // if failure -> send server issue error
    .catch(() => { sendServerAlert() });
        
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('jwt');
    dispatch({type: 'signout'});
    navigate('authFlow');
};

const tryLocalSignIn = dispatch => async (data, error) => {
    if (!error) {
        dispatch({type: 'signin', userId: data.userId });
        navigate('Home');
    } else {
        navigate('authFlow');
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    { login, signout, signup, tryLocalSignIn},
    { userId: null }
);