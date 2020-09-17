import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/screens/LaunchScreen';
import HomeScreen from "./src/screens/HomeScreen";
import EasyModeScreen from "./src/screens/EasyModeScreen";
import HardModeScreen from "./src/screens/HardModeScreen";
import { AppLoading } from 'expo';
import { useFonts, TextMeOne_400Regular } from '@expo-google-fonts/text-me-one';


const Stack = createStackNavigator();

function App() {
    let [fontsLoaded] = useFonts({ TextMeOne_400Regular });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Launch"
            screenOptions={{
                headerStyle: { 
                    backgroundColor: '#DBA28D',
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                headerTintColor: '#5C240F',
                headerTitleStyle: {
                    fontFamily: 'TextMeOne_400Regular',
                    fontSize: 30,
                    
                },
                headerTitleAlign: 'center',
                cardStyle: { 
                    backgroundColor: '#DBA28D',
                }

            }}>
            <Stack.Screen 
                name="Launch"
                component={LaunchScreen}
                options={{ title: 'Button Push' }}
            />
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen 
                name="EasyMode"
                component={EasyModeScreen}
            />
            <Stack.Screen 
                name="HardMode"
                component={HardModeScreen}
            />
        </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;