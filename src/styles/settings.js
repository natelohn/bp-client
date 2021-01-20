import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SECONDARY_COLOR, SIDE_ICON_OFFSET } from './global'


const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    back: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
    },
    editPrompt: {
        height: 40,
        color: ACCENT_COLOR,
        borderBottomColor: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 32,
        textDecorationLine: 'underline'
    },
    textInput: {
        height: 40,
        color: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 36,
        marginBottom: 40
    },
    buttonView: {
        marginBottom: 80
    },
    logout: {
        borderBottomColor: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        color: ACCENT_COLOR,
        fontSize: 22,
        textDecorationLine: 'underline'
    }
});

export default styles;