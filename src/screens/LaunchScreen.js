import React, { useReducer, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonView from '../components/ButtonView'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1
    },
    subButton: {
        alignSelf: 'center',
        color: '#5C240F',
        fontSize: 24,
        textDecorationLine: 'underline',
        fontFamily: 'TextMeOne_400Regular',
        margin: 20
    },
    inputView: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20,
        color: '#5C240F'
    },
    textInput: {
        height: 40,
        margin: 10,
        borderBottomColor: '#5C240F',
        borderBottomWidth: 0.25,
        fontFamily: 'TextMeOne_400Regular',
        fontSize: 18,
       
    }
});

const reducer = (state, action) => {
    switch (action.type) {
        case 'sub_button':
            return { ...state,
                    signingUp: !state.signingUp,
                    buttonText: state.subButtonText,
                    subButtonText: state.buttonText };
        default:
            return state;
    }
};

const LaunchScreen = () => {
    // State 
    const [state, dispatch] = useReducer(reducer, {
        signingUp: true,
        buttonText: 'Sign Up',
        subButtonText: 'Login'
    });
    const { signingUp, buttonText, subButtonText} = state;

    // Animation
    const offScreenRight = Dimensions.get('window').width
    const offScreenLeft = -1 * offScreenRight
    const onScreen = 0
    const usernameX = useRef(new Animated.Value(offScreenLeft)).current;
    const phoneX = useRef(new Animated.Value(offScreenRight)).current;

    const moveTextbox = (textbox, x) => {
        Animated.timing(textbox, {
            toValue: x,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const inputsToSignUp = () => {
        moveTextbox(usernameX, onScreen);
        moveTextbox(phoneX, onScreen);
    }

    const inputsToLogin = () => {
        moveTextbox(usernameX, offScreenLeft);
        moveTextbox(phoneX, onScreen);
    }

    // Helper Functions
    const pressSignUp = () => {
        inputsToSignUp();
        console.log('Sign Up', signingUp);
        console.log('---------------------------------');
    }

    const pressLogIn = () => {
        inputsToLogin();
        console.log('Log In', !signingUp);
        console.log('---------------------------------');
    }

    const mainButtonPressed = () => {
        console.log('Main');
        if (signingUp) {
            pressSignUp();
        } else {
            pressLogIn();
        };
    }

    const subButtonPressed = () => {
        if (signingUp) {
            inputsToLogin();
        } else {
            inputsToSignUp();
        };
        dispatch({type: 'sub_button'});
    }
    
    // Component
    return (
        <View style={styles.view}>
            <View style={styles.inputView}>
                <Animated.View style={[{ transform: [{ translateX: usernameX }]}]}>
                    <TextInput style={styles.textInput} placeholder='Username'/> 
                </Animated.View>
                <Animated.View style={[{ transform: [{ translateX: phoneX }]}]}>
                    <TextInput style={styles.textInput} placeholder='Phone'/>
                </Animated.View>
            </View>
            <ButtonView text={buttonText} onPressCallback={mainButtonPressed}/>
            <TouchableOpacity onPress={subButtonPressed}>
                <Text style={styles.subButton}>{subButtonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LaunchScreen;