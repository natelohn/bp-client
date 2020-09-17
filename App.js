import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/screens/LaunchScreen';
// import HomeScreen from "./src/screens/HomeScreen";
// import EasyModeScreen from "./src/screens/EasyModeScreen";
// import HardModeScreen from "./src/screens/HardModeScreen";
import { AppLoading } from 'expo';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


const Stack = createStackNavigator();

function App() {
    let [fontsLoaded] = useFonts({ Inter_900Black });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#DBA28D',
                },
                headerTintColor: '#5C240F',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontFamily: 'Inter_900Black'
                },
            }}>
            <Stack.Screen name="Launch" component={LaunchScreen} />
        </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;