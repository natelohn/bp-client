import React, { useReducer, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonView from '../components/ButtonView'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1
    },
    subButton: {
        alignSelf: 'center'
    },
    subButtonText: {
        alignSelf: 'center',
        color: '#5C240F',
        fontSize: 22,
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
        case 'main_button':
            return { ...state, submitState: true };
        case 'sub_button':
            return { ...state,
                    submitState: true,
                    signingUp: !state.signingUp};
        default:
            return state;
    }
};

const LaunchScreen = () => {
    // State Management
    const [state, dispatch] = useReducer(reducer, {
        submitState: false,
        signingUp: true
    });
    const { submitState, signingUp } = state;

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    // Text Inputs - Animation
    const offScreenRight = screenWidth;
    const offScreenLeft = -1 * offScreenRight;
    const onScreen = 0;
    const usernameX = useRef(new Animated.Value(offScreenLeft)).current;
    const phoneX = useRef(new Animated.Value(offScreenRight)).current;
    // Button Scale - Animation
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    const inputRange = [0, 1];
    const outputRange = [1, 0.6];
    const buttonScale = buttonAnimation.interpolate({inputRange, outputRange});
    // Button Location - Animation
    const mainX = useRef(new Animated.Value(0)).current;
    const mainY = useRef(new Animated.Value(0)).current;
    const subX = useRef(new Animated.Value(0)).current;
    const subY = useRef(new Animated.Value(0)).current;
    const buttonsMoveX = screenWidth / 5;
    const buttonsMoveY = (screenHeight / 7) * -1
    
    const buttonsToSubmitState = () => {
        Animated.spring(mainX, {
            toValue: buttonsMoveX,
            useNativeDriver: true,
        }).start();
        Animated.spring(mainY, {
            toValue: buttonsMoveY,
            useNativeDriver: true,
        }).start();
        Animated.spring(subX, {
            toValue: buttonsMoveX * -1,
            useNativeDriver: true,
        }).start();
        Animated.spring(subY, {
            toValue: buttonsMoveY * 2,
            useNativeDriver: true,
        }).start();
        Animated.spring(buttonAnimation, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
    };

    const moveTextbox = (textbox, x) => {
        Animated.timing(textbox, {
            toValue: x,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    // Helper Functions
    const inputsToSignUp = () => {
        moveTextbox(usernameX, onScreen);
        moveTextbox(phoneX, onScreen);
    }

    const inputsToLogin = () => {
        moveTextbox(usernameX, offScreenLeft);
        moveTextbox(phoneX, onScreen);
    }

    const mainButtonPressed = () => {
        buttonsToSubmitState();
        if (signingUp) {
            inputsToSignUp();
        } else {
            inputsToLogin();
        };
        if (submitState){
            if (signingUp) {
                console.log('SIGNING UP');
                // TODO: Add sign up call/error checking
            } else {
                console.log('LOGGING IN');
                // TODO: Add login call/error checking
            }
        }
        dispatch({type: 'main_button'});
    }

    const subButtonPressed = () => {
        buttonsToSubmitState();
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
            <Animated.View style={[{transform: [{scale: buttonScale}, {translateX: mainX}, {translateY: mainY}]}]}>
                { signingUp ? <ButtonView text="Sign Up" onPressCallback={mainButtonPressed}/>
                            : <ButtonView text="Login" onPressCallback={mainButtonPressed}/> }
            </Animated.View>
            <Animated.View style={[{transform: [{translateX: subX}, {translateY: subY}]}]}>
                <TouchableOpacity style={styles.subButton} onPress={subButtonPressed}>
                    { signingUp ? <Text style={styles.subButtonText}>Login</Text>
                                : <Text style={styles.subButtonText}>Sign Up</Text>
                    }
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default LaunchScreen;