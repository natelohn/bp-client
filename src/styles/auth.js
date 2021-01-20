import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR, SECONDARY_COLOR } from './global'

const textInput = {
    height: 40,
    margin: 10,
    borderBottomColor: ACCENT_COLOR,
    borderBottomWidth: 0.25,
    fontFamily: MAIN_FONT_STYLE,
    fontSize: 18
}
const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    subButton: {
        alignSelf: 'center'
    },
    subButtonText: {
        alignSelf: 'center',
        color: ACCENT_COLOR,
        fontSize: 22,
        textDecorationLine: 'underline',
        fontFamily: MAIN_FONT_STYLE,
        margin: 20
    },
    inputView: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20,
        color: ACCENT_COLOR
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