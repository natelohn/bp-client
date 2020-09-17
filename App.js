import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/screens/LaunchScreen'
// import HomeScreen from "./src/screens/HomeScreen";
// import EasyModeScreen from "./src/screens/EasyModeScreen";
// import HardModeScreen from "./src/screens/HardModeScreen";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Launch" component={LaunchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;