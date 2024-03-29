import React, { useContext, useReducer, useRef } from 'react';
import { Animated, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { sendServerAlert, showSignUpError, showLogInError } from '../components/Alerts'
import ButtonView from '../components/ButtonView'
import { useMutation } from '@apollo/client';
import {  INIT_VERIFICATION_MUTATION, REGISTER_MUTATION, LOGIN_MUTATION } from '../apollo/gql'
import { Context as AuthContext } from "../context/AuthContext";
import styles from '../styles/auth';
import { formatMobileNumber, usPhoneNumber } from '../utils';



const reducer = (state, {type, username, phone, otp}) => {
    const phone_passed = typeof(phone) !== 'undefined' || phone != null;
    const phone_length = phone_passed ? phone.replace(/\D/g, "").length : state.phone.length;
    const username_passed = typeof(username) !== 'undefined' || username != null;
    const username_length = username_passed ? username.length : state.username.length;
    let formIsValid = phone_length === 10 && (!state.signingUp || username_length > 0);
    switch (type) {
        case 'main_button':
            return { ...state,
                        submitState: true,
                        formIsValid };
        case 'sub_button':
            formIsValid = state.signingUp ? phone_length === 10: phone_length === 10 && username_length > 0;
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
        case 'otp_edit':
            return { ...state,
                        otp, 
                        formIsValid: otp.length === 5 };
        case 'verify':
            return { ...state,
                        verifying: true,
                        mainButtonText: 'Verify',
                        subButtonText: 'Back',
                        otp: '',
                        formIsValid: false };
        case 'back':
            return { ...state,
                        verifying: false,
                        mainButtonText: state.signingUp ? 'Sign Up' : 'Login',
                        subButtonText: state.signingUp ? 'Login' : 'Sign Up', 
                        formIsValid };
        default:
            return state;
    }
};


const AuthScreen = () => {
    const { signup, login } = useContext(AuthContext);
    // Apollo Client Hooks
    const [callInitiateVerification] = useMutation(INIT_VERIFICATION_MUTATION);
    const [callLogin] = useMutation(LOGIN_MUTATION);
    const [callSignUp] = useMutation(REGISTER_MUTATION);
        
    // State Management
    const [state, dispatch] = useReducer(reducer, {
        submitState: false,
        signingUp: true,
        mainButtonText: 'Sign Up',
        subButtonText: 'Login',
        username: '',
        phone: '',
        otp: '',
        formIsValid: true,
        verifying: false
    });
    const { submitState,
            signingUp,
            mainButtonText,
            subButtonText,
            username,
            phone,
            otp,
            formIsValid,
            verifying
            } = state;

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    // Text Inputs - Animation
    const offScreenRight = screenWidth;
    const offScreenLeft = -1 * offScreenRight;
    const onScreen = 0;
    const usernameX = useRef(new Animated.Value(offScreenLeft)).current;
    const phoneX = useRef(new Animated.Value(offScreenRight)).current;
    const otpX = useRef(new Animated.Value(offScreenRight)).current;
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
    // TODO: Fix these values to work with all size screens
    const buttonsMoveX = screenWidth / 5;
    const buttonsMoveY = (screenHeight / 9) * -1
    
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

    const inputsToVerify = () => {
        moveTextbox(usernameX, offScreenLeft);
        moveTextbox(phoneX, offScreenLeft);
        moveTextbox(otpX, onScreen);
    }

    const initiateVerification = () => {
        callInitiateVerification({ 
            variables: { signingUp, phone: usPhoneNumber(phone) },
        })
        .then(({data}) => {
                // if success -> go to input code state
            if (data.initiateVerification) {
                inputsToVerify();
                dispatch({type: 'verify'});
            } 
            // if call returns false -> send init verification error
            else {
                const showError = signingUp ? showSignUpError : showLogInError
                showError(subButtonPressed)
            }
        })
        // if failure -> send server issue error (?)
        .catch(() => {sendServerAlert()});
    }

    const mainButtonPressed = () => {
        buttonsToSubmitState();
        if (!verifying) {
            if (signingUp) {
                inputsToSignUp();
            } else {
                inputsToLogin();
            };
            if (submitState && formIsValid){
                // send the init verification query
                initiateVerification();
            }
            dispatch({type: 'main_button'});
        } else {
            // send the init verification query
            if (signingUp) {
                // TODO: Check username for profanity/hate speach
                signup({ username, phone: usPhoneNumber(phone), otp }, callSignUp, subButtonPressed, initiateVerification);
            } else {
                login({ phone: usPhoneNumber(phone), otp }, callLogin, subButtonPressed, initiateVerification);
            }

        }
    }

    const subButtonPressed = () => {
        if (!verifying) {
            dispatch({type: 'sub_button'});
            buttonsToSubmitState();
            if (signingUp) {
                inputsToLogin();
            } else {
                inputsToSignUp();
            };
        } else {
            if (signingUp) {
                inputsToSignUp();
            } else {
                inputsToLogin();
            };
            dispatch({type: 'back'});
        }

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
                { verifying ?
                <Animated.View style={[{ transform: [{ translateX: otpX }]}]}>
                    <TextInput 
                        style={styles.codeInput}
                        value={otp}
                        placeholder='Passcode'
                        textContentType={'oneTimeCode'}
                        keyboardType={'number-pad'}
                        maxLength={5}
                        onChangeText={(otp) => {dispatch({type: 'otp_edit', otp})}}
                        returnKeyType="send"
                        onSubmitEditing={() => mainButtonPressed()}
                        autoFocus={verifying}/> 
                </Animated.View>
                :
                <Animated.View style={[{ transform: [{ translateX: phoneX }]}]}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Phone'
                        value={formatMobileNumber(phone)}
                        autoCompleteType={'tel'}
                        keyboardType={'phone-pad'}
                        maxLength={14}
                        onChangeText={(phone) => {dispatch({type: 'phone_edit', phone})}}
                        onSubmitEditing={() => mainButtonPressed()}
                        ref={phone_input}
                        autoFocus={submitState && !signingUp}/> 
                </Animated.View>
                }
            </View>
            <View style={styles.buttonArea}>
                <Animated.View style={[{transform: [{scale: buttonScale}, {translateX: mainX}, {translateY: mainY}]}]}>
                    <ButtonView displayText={mainButtonText} onPressCallback={mainButtonPressed} disabled={!formIsValid}/>
                </Animated.View>
                <Animated.View style={[{transform: [{translateX: subX}, {translateY: subY}]}]}>
                    <TouchableOpacity style={styles.subButton} onPress={subButtonPressed}>
                        <Text style={styles.subButtonText}>{subButtonText}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

export default AuthScreen;