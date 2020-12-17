import { AsyncStorage } from 'react-native'; // TODO: Update AsyncStorage 
import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { sendServerAlert, showOTPError } from '../components/Alerts'


const authReducer = (state, {type, userId, challengerId, username}) => {
  switch (type) {
      case 'signin':
          return {...state, userId, challengerId, username};
      case 'signout':
          return {...state, userId: null, challengerId: null, username: null};
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
            // TODO: Update to seperate local storage method
            await AsyncStorage.setItem('jwt', data.register.accessToken);
            // Update state & direct to home screen
            dispatch({
                type: 'signin',
                userId: data.register.userId,
                challengerId: data.register.challengerId,
                username: data.register.username
             });
            navigate('mainFlow');
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
            dispatch({
                type: 'signin',
                userId: data.login.userId,
                challengerId: data.login.challengerId,
                username: data.login.username
             });
            navigate('mainFlow');
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
        const authData = {
            userId: data.getUserFromContext.id,
            challengerId: data.getUserFromContext.challenger.id,
            username: data.getUserFromContext.challenger.username
        }
        dispatch({...authData, type: 'signin' });
        navigate('mainFlow');
    } else {
        navigate('authFlow');
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    { login, signout, signup, tryLocalSignIn},
    { userId: null, challengerId: null, username: null }
);