import { AsyncStorage } from 'react-native';
import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { useMutation } from '@apollo/client';
import {  REGISTER_MUTATION, LOGIN_MUTATION } from '../apollo/gql';
import { sendServerAlert, showOTPError } from '../components/Alerts'


const authReducer = (state, action) => {
  switch (action.type) {
      case 'add_error':
          return {...state, errorMessage: action.payload };
      case 'clear_error_message':
          return {...state, errorMessage: ''};
      case 'signin':
          return {...state, errorMessage: '', token: action.payload };
      case 'signout':
          return {...state, errorMessage: '', token: null };
      default:
          return state;
  }
};

const signup = dispatch => async ({ username, phone, otp }) => {
    const [callSignUp] = useMutation(REGISTER_MUTATION);
    // Send sign up data to the server and get a token and id
    callSignUp({ 
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
    .catch(() => {sendServerAlert()});

    try {
        // TODO: Verify inputs with server

    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something failed while signing up :/'
        });
    }
};

const login = dispatch => async ({ phone, otp }) => {
    // Verify inputs with server
    const [callLogin] = useMutation(LOGIN_MUTATION);
    callLogin({ 
        variables: { phone, otp },
    })
    .then(async ({data}) => {
        // if success -> go to home screen
        if (data.login.accessToken) {
            // Persist the token in local storage
            await AsyncStorage.setItem('jwt', data.login.accessToken);
            // Update state to direct to home screen
            dispatch({type: 'signin', payload: jwt});
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

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

export const {Provider, Context} = createDataContext(
    authReducer,
    { login, signout, signup, clearErrorMessage, tryLocalSignIn},
    {token: null, errorMessage: ''}
);