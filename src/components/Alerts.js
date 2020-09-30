import { Alert } from "react-native";

const sendTwoButtonAlert = (title, message, leftText, leftCallback, rightText, rightCallback) =>
    Alert.alert( title, message,
    [
        {
        text: leftText,
        onPress: leftCallback,
        },
        { text: rightText, onPress: rightCallback }
    ],
    { cancelable: false }
);


export default sendTwoButtonAlert