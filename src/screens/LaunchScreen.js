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
    const phone_passed = typeof(phone) !== 'undefined' || phone != null;
    const phone_length = phone_passed ? phone.replace(/\D/g, "").length : state.phone.length;
    const formIsValid = phone_length === 10 && (!state.signingUp || state.username.length > 0);
    switch (type) {
        case 'main_button':
            return { ...state,
                        submitState: true,
                        formIsValid };
        case 'sub_button':
            return { ...state,
                        submitState: true,
                        signingUp: !state.signingUp,
                        mainButtonText: state.subButtonText,
                        subButtonText: state.mainButtonText,
                        formIsValid };
        case 'username_edit':
            return { ...state,
                        username,
                        formIsValid};
        case 'phone_edit':
            return { ...state,
                        phone: phone.replace(/\D/g, ""), 
                        formIsValid };
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
        formIsValid: true,
        errorString: ''
    });
    const { submitState,
            signingUp,
            mainButtonText,
            subButtonText,
            username,
            phone,
            formIsValid,
            errorString } = state;

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
        if (submitState && formIsValid){
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

    const formatMobileNumber = (text) => {
        let formated = text.replace(/\D/g, "");
        const length = formated.length
        if (length >= 1) {
            formated = "(" + formated
        } 
        if (length >= 4) {
            formated = formated.slice(0, 4) + ") " + formated.slice(4);
        }
        if (length >= 7) {
            formated = formated.slice(0, 9) + "-" + formated.slice(9);
        }
        return formated;
    }

    const phone_input = useRef();
    
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
                        onChangeText={(username) => {dispatch({type: 'username_edit', username});}}
                        autoFocus={submitState}
                        returnKeyType="next"
                        onSubmitEditing={() => phone_input.current.focus()}
                        blurOnSubmit={false} /> 
                </Animated.View>
                <Animated.View style={[{ transform: [{ translateX: phoneX }]}]}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Phone'
                        value={formatMobileNumber(phone)}
                        autoCompleteType={'tel'}
                        keyboardType={'phone-pad'}
                        maxLength={14}
                        onChangeText={(phone) => {dispatch({type: 'phone_edit', phone})}}
                        returnKeyType="done"
                        onSubmitEditing={() => mainButtonPressed()}
                        ref={phone_input}
                        autoFocus={submitState && !signingUp}/> 
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