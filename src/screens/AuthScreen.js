import React, { useContext, useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
import { Animated, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { navigate } from "../navigationRef";
import { Context as UserContext } from '../context/UserContext';
import ButtonView from '../components/ButtonView';
import styles from '../styles/auth';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global'
import { formatDisplayMobileNumber, formatSubmitMobileNumber, validUSPhoneNumber } from '../utils';
import { sendServerAlert } from '../components/Alerts';

const US_PHONE_LENGTH = 14
const OTP_LENGTH = 6;

const AuthScreen = () => {
    const [ session, setSession ] = useState(null);
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ otp, setOTP ] = useState('');
    const [ otpInputColor, setOtpInputColor ] = useState(ACCENT_COLOR);
    const [ verifying, setVerifying ] = useState(false);
    const { setUser } = useContext(UserContext);

    // Text Inputs - Animation
    const screenWidth = Dimensions.get('window').width;
    const offScreenLeft = -1 * screenWidth;
    const onScreen = 0;
    const inputX = useRef(new Animated.Value(onScreen)).current;
    const phoneInput = useRef();
    const otpInput = useRef();
    
    const signIn = () => {
        const number = formatSubmitMobileNumber(phoneNumber);
        Auth.signIn(number)
        .then((result) => {
            setSession(result);
            setVerifying(true);
        })
        .catch((e) => {
            if (e.code === 'UserNotFoundException') {
                signUp();
            } else if (e.code === 'UsernameExistsException') {
                signIn();
            } else {
                sendServerAlert();
            }
          });
      };

    const signUp = async () => {
        const number = formatSubmitMobileNumber(phoneNumber);
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
        Auth.sendCustomChallengeAnswer(session, otp)
        .then((user) => {
            setSession(null);
            setVerifying(false);
            setUser(user);
            // TODO: Handle this transition w/in the context (sending to main if the user has a profile)
            navigate('Settings', { signingUp: true })
        })
        .catch(() => {
            otpError();
        });
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
        setVerifying(false);
        moveTextInputView(onScreen);
        phoneInput.current.focus();
    }

    const pressButton = () => {
        if (verifying) {
            verifyOtp();
        } else {
            signIn();
            moveTextInputView(offScreenLeft);
            otpInput.current.focus();
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
        if (verifying){
            return otp.length != OTP_LENGTH;
        } else {
            return !validUSPhoneNumber(phoneNumber) 
        }
    }

    const resendOtp = () => {
        setOTP('');
        signIn();
    }

    // TODO: Delete unused auth code
    // TODO: Add sign out to settings screen
    return (
        <View style={styles.view}>
            { verifying && 
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
                        textContentType='telephoneNumber'
                        maxLength={US_PHONE_LENGTH}
                        onChangeText={setPhoneNumber}
                        onSubmitEditing={pressButton}
                        autoFocus={!verifying}
                        ref={phoneInput}
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
                        ref={otpInput}
                    />
                    <Text style={styles.numberReminderText}>Sent to {phoneNumber}</Text>
                </View>
            </Animated.View>
            <View style={styles.buttonView}>
                <ButtonView onPressCallback={pressButton} disabled={isButtonDisabled()}/>
                { verifying && 
                <TouchableOpacity onPress={resendOtp} >
                    <Text style={styles.resendText}>Resend</Text>
                </TouchableOpacity> }
            </View>
        </View>
    );
}

export default AuthScreen;