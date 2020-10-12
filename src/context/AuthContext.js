import { AsyncStorage } from 'react-native';
import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { sendServerAlert, showOTPError } from '../components/Alerts'


const authReducer = (state, action) => {
  switch (action.type) {
      case 'signin':
          return {...state, token: action.payload };
      case 'signout':
          return {...state, token: null };
      default:
          return state;
  }
};

const signup = dispatch => async ({ username, phone, otp }, signUpCallback) => {
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
            dispatch({type: 'signin', payload: data.register.accessToken});
            navigate('Home');
        } 
        // Handle errors if sign up failed
        else {
            showOTPError();
        }
    })
    // if failure -> send server issue error
    .catch(() => { sendServerAlert()});
};

const login = dispatch => async ({ phone, otp }, loginCallback) => {
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
            dispatch({type: 'signin', payload: data.login.accessToken});
            navigate('Home');
        } 
        // Handle errors if login failed
        else {
            showOTPError();
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

const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('jwt');
    // TODO: Verify token
    // const { loading, error, data } = useQuery(USER_ID_QUERY);
    if (token) {
        dispatch({type: 'signin', payload: token});
        navigate('Home');
    } else {
        navigate('authFlow');
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    { login, signout, signup, tryLocalSignIn},
    {token: null, errorMessage: ''}
);