import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR, SECONDARY_COLOR, TOP_ICON_OFFSET, SIDE_ICON_OFFSET} from './global'

const textInput = {
    height: 40,
    borderBottomColor: ACCENT_COLOR,
    borderBottomWidth: 0.25,
    fontFamily: MAIN_FONT_STYLE,
    alignSelf: 'center',
    textAlign: 'center',
    color: ACCENT_COLOR
}
const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    exit: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
    },
    inputView: {
        flexDirection: 'row',
    },
    textInputView: {
        width: '100%',
        marginBottom: 20
    },
    phoneInput: {
        ...textInput,
        fontSize: 28,
        width: '70%',
        marginBottom: 5
    },
    codeInput: {
        ...textInput,
        fontSize: 38,
        width: '60%',
    },
    buttonView: {
        marginBottom: 40
    },
    numberReminderText: {
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 12,
        alignSelf: 'center',
        textAlign: 'center',
        color: ACCENT_COLOR
    },
    resendText: {
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center',
        color: ACCENT_COLOR,
        textDecorationLine: 'underline',
        marginTop: 10,
        marginBottom: 20
    }
});

export default styles;