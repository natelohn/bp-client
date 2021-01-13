import { Alert } from "react-native";
import { formatMobileNumber } from '../utils';

export const sendOneButtonAlert = (title, message, buttonText, callback) =>
    Alert.alert( title, message,
        [
            { text: buttonText, onPress: callback },
        ],
        { cancelable: false }
    );

export const sendTwoButtonAlert = (title, message, leftText, leftCallback, rightText, rightCallback) =>
    Alert.alert( title, message,
        [
            { text: leftText, onPress: leftCallback },
            { text: rightText, onPress: rightCallback }
        ],
        { cancelable: false }
    );

export const sendServerAlert = (callback) => {
        // TODO: put in real email here
        Alert.alert( 'CONNECTION ISSUE', 'Please check your internet connection, if your connection is stable, please contact help@buttonpush.com',
        [ { text: 'OK', onPress: callback } ],
        { cancelable: false }
    );
}

export const showSignUpError = (continueCallback) => {
    const mainText = 'SIGN UP ERROR';
    const subText = 'It looks like this number belongs to a current user. Would you like to log in instead?';
    const leftText = 'Edit Number';
    const rightText = 'Log In';
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, continueCallback)
}

export const showLogInError = (continueCallback) => {
    const mainText = 'LOG IN ERROR';
    const subText = 'It looks like this is a new number. Would you like to sign up instead?';
    const leftText = 'Edit Number';
    const rightText = 'Sign Up';
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, continueCallback)
}

export const showOTPError = (phone, leftCallback, rightCallback) => {
    const formatedPhone = formatMobileNumber(phone.substring(2))
    const mainText = 'INCORRECT CODE';	
    const subText = 'The code was sent to +1' + formatedPhone + '. Try again?';	
    const leftText = 'Edit Number';	
    const rightText = 'Resend';	
    sendTwoButtonAlert(mainText, subText, leftText, leftCallback, rightText, rightCallback)	
}

export const promptLogout = (logoutCallback) => {
    const mainText = 'LOG OUT';
    const subText = 'Are you sure you want to logout?';
    const leftText = 'Cancel';
    const rightText = 'Logout';
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, logoutCallback)
}

export const showForfeitPrompt = (forfeitCallback, instigatorName, totalLosses) => {
    const mainText = 'Are you sure?';
    const lossText = totalLosses > 1 ? 'losses' : 'loss';
    const subText = `Forfeiting to ${instigatorName} will result in a score of 0 seconds for this push off and ${totalLosses} ${lossText} added to your record.`;	
    const leftText = 'Cancel';	
    const rightText = 'Forfeit';	
    sendTwoButtonAlert(mainText, subText, leftText, () => {}, rightText, forfeitCallback)	
}


export const showPendingChallengerUnavailableMessage = (challengerUsername) => {
    const mainText = `User Unavailable`;
    const subText = `You and ${challengerUsername} must complete the last challenge you have together before you can send them another challenge.`;
    const buttonText = 'Ok';
    sendOneButtonAlert(mainText, subText, buttonText)	
}