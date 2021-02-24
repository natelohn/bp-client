import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Animated, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonView from '../components/ButtonView';
import styles from '../styles/auth';
import { formatDisplayMobileNumber, formatSubmitMobileNumber, validUSPhoneNumber } from '../utils';




const AuthScreen = () => {
    const [ session, setSession ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ otp, setOTP ] = useState('');
    
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
        console.log('Verifying otp...')
        Auth.sendCustomChallengeAnswer(session, otp)
        .then((user) => {
            console.log('USER FOUND:', user)
            setSession(null);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    const signOut = () => {
        console.log('Signing Out...')
        Auth.signOut();
    };

    const pressButton = () => {
        if (!session) {
            signIn();
        } else {
            verifyOtp();
        }
    }
    
    // Component
    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                placeholder='Phone'
                value={formatDisplayMobileNumber(phoneNumber)}
                autoCompleteType='tel'
                keyboardType='phone-pad'
                maxLength={14}
                onChangeText={setPhoneNumber}
                onSubmitEditing={signIn}
                autoFocus={true}
            />
            <TextInput
                style={styles.codeInput}
                placeholder='Passcode'
                value={otp}
                textContentType='oneTimeCode'
                keyboardType='number-pad'
                maxLength={6}
                onChangeText={setOTP}
                returnKeyType="send"
                onSubmitEditing={verifyOtp}
            />
            <ButtonView onPressCallback={pressButton} disabled={!validUSPhoneNumber(phoneNumber)}/>
        </View>
    );
}

export default AuthScreen;