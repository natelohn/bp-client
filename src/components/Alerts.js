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