import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, useMutation, useQuery  } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { AppLoading } from 'expo';
import { useFonts, TextMeOne_400Regular } from '@expo-google-fonts/text-me-one';
import apoloClient from './src/apollo/index';
import { USER_ID_QUERY, REGISTER_MUTATION, LOGIN_MUTATION } from './src/apollo/gql'
import { sendServerAlert, sendTwoButtonAlert } from './src/components/Alerts'
import SplashScreen from './src/screens/SplashScreen'
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';




const AuthContext = React.createContext();
const Stack = createStackNavigator();

const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_ID':
        return {
          ...prevState,
          userId: action.id,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userId: action.id,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userId: null,
        };
    }
  }

const initialState = {
    isLoading: true,
    isSignout: false,
    userId: null,
}

const showOTPError = () => {
    const formatedPhone = formatMobileNumber(phone)
    const mainText = 'INCORRECT CODE';
    const subText = 'The code was sent to +1' + formatedPhone + '. Try again?';
    const leftText = 'Back';
    const rightText = 'Resend';
    sendTwoButtonAlert(mainText, subText, leftText, subButtonPressed, rightText, initiateVerification)
}

const storeJWT = (jwt) => {
    SecureStore.setItemAsync('jwt', jwt)
    .catch((e) => console.log('Error Storing JWT:', e));
}

function App() {

    
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        // Switch to the Home screen or Auth screen
        dispatch({ type: 'RESTORE_ID', id: data.userId });
      }, []);

    const authContext = React.useMemo(() => ({
        signUp: async data => {
            // Send sign up data to the server and get a token and id
            callSignUp({ 
                variables: { username: data.username, phone: data.phone, otp: data.otp },
            })
            .then(({data}) => {
                // if success -> go to home screen
                if (data.register.accessToken) {
                    // Persist the token in local storage
                    storeJWT(data.register.accessToken)
                    // Update state to direct to home screen
                    dispatch({ type: 'SIGN_IN', id: data.register.userId });
                } 
                // Handle errors if sign up failed
                else {
                    showOTPError();
                }
            })
            // if failure -> send server issue error
            .catch(() => {sendServerAlert()});
        },
        logIn: async data => {
            // Send login data to the server and get a token and id
            callLogin({ 
                variables: { phone: data.phone, otp: data.otp },
            })
            .then(({data}) => {
                // if success -> go to home screen
                if (data.login.accessToken) {
                    // Persist the token in local storage
                    storeJWT(data.login.accessToken)
                    // Update state to direct to home screen
                    dispatch({ type: 'SIGN_IN', id: data.login.userId });
                } 
                // Handle errors if login failed
                else {
                    showOTPError();
                }
            })
            // if failure -> send server issue error
            .catch(() => {sendServerAlert()});
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
    );

    let [fontsLoaded] = useFonts({ TextMeOne_400Regular });
    
    if (!fontsLoaded) {
        return <AppLoading/>;
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <ApolloProvider client={apoloClient}>
                    <Stack.Navigator screenOptions={screenOptions}>
                        {state.isLoading ? (
                            <Stack.Screen name="Splash" component={SplashScreen} />
                        ) : state.userId == null ? (
                            // No token found, user isn't signed in
                            <Stack.Screen
                                name="Auth"
                                component={AuthScreen}
                                options={{
                                    title: 'Button Push',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                            />
                        ) : (
                            // User is signed in
                            <Stack.Screen name="Home" component={HomeScreen}/>
                        )}
                    </Stack.Navigator>
                </ApolloProvider>
            </NavigationContainer>
        </AuthContext.Provider>
  );
}

export default App;