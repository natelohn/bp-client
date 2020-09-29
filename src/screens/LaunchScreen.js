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

const reducer = (state, {type, username, phone}) => {
    switch (type) {
        case 'main_button':
            return { ...state,
                        submitState: true,
                        formIsValid: false };
        case 'sub_button':
            return { ...state,
                        submitState: true,
                        signingUp: !state.signingUp,
                        mainButtonText: state.subButtonText,
                        subButtonText: state.mainButtonText,
                        formIsValid: false };
        case 'username_edit':
            return { ...state,
                        username,
                        formIsValid: username.length > 0 && state.phone.length === 10 };
        case 'phone_edit':
            return { ...state,
                        phone, 
                        formIsValid: phone.length === 10 && (!state.signingUp || state.username.length > 0) };
        default:
            return state;
    }
};

const LaunchScreen = () => {
    // State Management
    const [state, dispatch] = useReducer(reducer, {
        submitState: false,
        signingUp: true,
        mainButtonText: 'Sign Up',
        subButtonText: 'Login',
        username: '',
        phone: '',
        formIsValid: true
    });
    const { submitState, signingUp, mainButtonText, subButtonText, username, phone, formIsValid } = state;

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
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Username'
                        value={username}
                        maxLength={32}
                        autoCompleteType={'username'}
                        onChangeText={(username) => {dispatch({type: 'username_edit', username});}}/> 
                </Animated.View>
                <Animated.View style={[{ transform: [{ translateX: phoneX }]}]}>
                    <TextInput 
                            style={styles.textInput}
                            placeholder='Phone'
                            value={phone}
                            autoCompleteType={'tel'}
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            onChangeText={(phone) => {dispatch({type: 'phone_edit', phone})}}/> 
                </Animated.View>
            </View>
            <Animated.View style={[{transform: [{scale: buttonScale}, {translateX: mainX}, {translateY: mainY}]}]}>
                <ButtonView text={mainButtonText} onPressCallback={mainButtonPressed} disabled={!formIsValid}/>
            </Animated.View>
            <Animated.View style={[{transform: [{translateX: subX}, {translateY: subY}]}]}>
                <TouchableOpacity style={styles.subButton} onPress={subButtonPressed}>
                    <Text style={styles.subButtonText}>{subButtonText}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default LaunchScreen;