import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ApolloProvider } from '@apollo/client';
import { useFonts, TextMeOne_400Regular } from '@expo-google-fonts/text-me-one';
import { AppLoading } from 'expo';

import { setNavigator } from "./src/navigationRef"
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as PushOffProvider } from "./src/context/PushOffContext";
import { Provider as ChallengerProvider } from "./src/context/ChallengerContext";
import apoloClient from './src/apollo/index';

import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from './src/screens/HomeScreen';
import CreateScreen from './src/screens/CreateScreen';
import ResultsScreen from './src/screens/ResultsScreen';

// TODO: Enforce styling
const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    authFlow: createStackNavigator({
        Auth: AuthScreen
    }, { headerMode: 'none' }),
    mainFlow: createStackNavigator({
        Home: HomeScreen,
        Create: CreateScreen,
        Results: ResultsScreen,
    }, { headerMode: 'none' }
    )
});

const App = createAppContainer(switchNavigator);

export default () => {
    let [fontsLoaded] = useFonts({ TextMeOne_400Regular });
    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    return (
        <ApolloProvider client={apoloClient}>
            <AuthProvider>
                <PushOffProvider>
                    <ChallengerProvider>
                        <App ref={(navigator) => setNavigator(navigator)} />
                    </ChallengerProvider>
                </PushOffProvider>
            </AuthProvider>
        </ApolloProvider>
    );
};