import { StyleSheet } from 'react-native';

const textInput = {
    height: 40,
    margin: 10,
    borderBottomColor: '#5C240F',
    borderBottomWidth: 0.25,
    fontFamily: 'TextMeOne_400Regular',
    fontSize: 18
}
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
        ...textInput
    },
    codeInput: {
        ...textInput,
        fontSize: 38,
        textAlign: 'center'
    }
});

export default styles;