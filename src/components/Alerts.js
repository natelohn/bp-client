import { Alert } from "react-native";

export const sendTwoButtonAlert = (title, message, leftText, leftCallback, rightText, rightCallback) =>
    Alert.alert( title, message,
        [
            { text: leftText, onPress: leftCallback },
            { text: rightText, onPress: rightCallback }
        ],
        { cancelable: false }
    );

export const sendServerAlert = () => 
    Alert.alert( 'CONNECTION ISSUE', 'Please check your internet connection, if your connection is stable, please contact help@buttonpush.com',
        [ { text: 'OK' } ],
        { cancelable: false }
    );

export const showSignUpError = () => {
    const mainText = 'SIGN UP ERROR';
    const subText = 'It looks like this number belongs to a current user. Would you like to log in instead?';
    const leftText = 'Edit Number';
    const rightText = 'Log In';
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, subButtonPressed)
}

export const showLogInError = () => {
    const mainText = 'LOG IN ERROR';
    const subText = 'It looks like this is a new number. Would you like to sign up instead?';
    const leftText = 'Edit Number';
    const rightText = 'Sign Up';
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, subButtonPressed)
}