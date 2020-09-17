import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonView from '../components/ButtonView'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    login: {
        alignSelf: 'center',
        color: '#5C240F',
        fontSize: 24,
        textDecorationLine: 'underline',
        fontFamily: 'TextMeOne_400Regular',
        margin: 20
    }
});


const signUp = () => {
    console.log('Sign Up');
}

const LaunchScreen = () => {
    return (
        <View style={styles.view}>
            <ButtonView text="Sign Up" onPressCallback={signUp}/>
            <Text style={styles.login}>Login</Text>
        </View>
    );
}

export default LaunchScreen;