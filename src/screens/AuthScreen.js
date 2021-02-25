import React, { useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
import { Animated, Dimensions, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ButtonView from '../components/ButtonView';
import styles from '../styles/auth';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global'
import { formatDisplayMobileNumber, formatSubmitMobileNumber, validUSPhoneNumber } from '../utils';

const US_PHONE_LENGTH = 14
const OTP_LENGTH = 6;

const AuthScreen = () => {
    const [ session, setSession ] = useState(null);
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ otp, setOTP ] = useState('');
    const [ otpInputColor, setOtpInputColor ] = useState(ACCENT_COLOR);

    // Animation
    const screenWidth = Dimensions.get('window').width;
    // Text Inputs - Animation
    const offScreenRight = screenWidth;
    const offScreenLeft = -1 * screenWidth;
    const onScreen = 0;
    const inputX = useRef(new Animated.Value(onScreen)).current;
    
    const signIn = () => {
        const number = formatSubmitMobileNumber(phoneNumber);
        console.log('Signing In...', number)
        Auth.signIn(number)
        .then((result) => {
            setSession(result);
            console.log('RESULT:', result)
        })
        .catch((e) => {
            if (e.code === 'UserNotFoundException') {
                console.log('User does not exist. Waiting for sign up...')
                signUp();
            } else if (e.code === 'UsernameExistsException') {
                console.log('User exists. Waiting for sign in...')
                signIn();
            } else {
                console.log(e.code);
                console.error(e);
            }
          });
      };

    const signUp = async () => {
        const number = formatSubmitMobileNumber(phoneNumber);
        console.log('Signing up...', number)
        const requiredFakePassword = 'FakePW#' + Math.random().toString(10);
        const result = await Auth.signUp({
            username: number,
            password: requiredFakePassword,
            attributes: { phone_number: number }
        })
        .then(() => signIn());
        return result;
    };

    const verifyOtp = () => {
        console.log('Verifying otp...');
        Auth.sendCustomChallengeAnswer(session, otp)
        .then((user) => {
            console.log('USER FOUND:', user)
            setSession(null);
            // TODO:
            // Set the user in context
            // Nav to main flow 
        })
        .catch((err) => {
            console.log(err);
            otpError()
        });
    };

    const signOut = () => {
        console.log('Signing Out...')
        Auth.signOut();
    };
    
    const moveTextInputView = (x) => {
        Animated.timing(inputX, {
            toValue: x,
            duration: 250,
            useNativeDriver: true
        }).start();
    };

    const backToPhoneInput = () => {
        setSession(null);
        setOTP('');
        moveTextInputView(onScreen);
    }

    const pressButton = () => {
        if (!session) {
            moveTextInputView(offScreenLeft);
            signIn();
        } else {
            verifyOtp();
        }
    };

    const resetOtpInput = () => {
        setOtpInputColor(ACCENT_COLOR);
        setOTP('');
    }

    const otpError = () => {
        setOtpInputColor(PRIMARY_COLOR)
        const start = offScreenLeft;
        const moveAmount = 10;
        const duration = 75;
        const animationRounds = 8;
        const animationSequence = [];
        for (let i = 0; i <= animationRounds; i++ ) {
            const dir = i % 2 === 0 ? 1 : -1;
            const toValue = i < animationRounds ? start + (dir * moveAmount) : start;
            animationSequence.push( Animated.timing(inputX, { toValue, duration, useNativeDriver: true }));
        }
        Animated.sequence(animationSequence).start((resetOtpInput));
    }

    const isButtonDisabled = () => {
        if (session){
            return otp.length != OTP_LENGTH;
        } else {
            return !validUSPhoneNumber(phoneNumber) 
        }
    }

    
    // Component
    return (
        <View style={styles.view}>
            { session && 
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.exit}
                onPress={ backToPhoneInput }
            />
            }
            <Animated.View style={[styles.inputView, { transform: [{ translateX: inputX }]}]}>
                <View style={styles.textInputView}>
                    <TextInput
                        style={styles.phoneInput}
                        placeholder='Phone'
                        value={formatDisplayMobileNumber(phoneNumber)}
                        autoCompleteType='tel'
                        keyboardType='phone-pad'
                        maxLength={US_PHONE_LENGTH}
                        onChangeText={setPhoneNumber}
                        onSubmitEditing={pressButton}
                        autoFocus={true}
                    />
                </View>
                <View style={ styles.textInputView }>
                    <TextInput
                        style={{ ...styles.codeInput, color: otpInputColor}}
                        placeholder='Passcode'
                        value={otp}
                        textContentType='oneTimeCode'
                        keyboardType='number-pad'
                        maxLength={OTP_LENGTH}
                        onChangeText={setOTP}
                        returnKeyType="send"
                        onSubmitEditing={pressButton}
                        autoFocus={true}
                    />
                    <Text style={styles.numberReminderText}>Sent to {phoneNumber}</Text>
                </View>
            </Animated.View>
            <View style={styles.buttonView}>
                <ButtonView onPressCallback={pressButton} disabled={isButtonDisabled()}/>
            </View>
        </View>
    );
}

export default AuthScreen;