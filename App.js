import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import apoloClient from './src/apollo/index';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import EasyModeScreen from './src/screens/EasyModeScreen';
import HardModeScreen from './src/screens/HardModeScreen';
import LaunchScreen from './src/screens/LaunchScreen';
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
                <ApolloProvider client={apoloClient}>
                    <Stack.Navigator
                        initialRouteName='Launch'
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
                            name='Launch'
                            component={LaunchScreen}
                            options={{ title: 'Button Push' }}
                        />  
                        <Stack.Screen 
                            name='Auth'
                            component={AuthScreen}
                            options={{ title: 'Button Push' }}
                        />
                        <Stack.Screen 
                            name='Home'
                            component={HomeScreen}
                        />
                        <Stack.Screen 
                            name='EasyMode'
                            component={EasyModeScreen}
                        />
                        <Stack.Screen 
                            name='HardMode'
                            component={HardModeScreen}
                        />
                    </Stack.Navigator>
                </ApolloProvider>
            </NavigationContainer>
  );
}

export default App;