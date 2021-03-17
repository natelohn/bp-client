import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SECONDARY_COLOR, SIDE_ICON_OFFSET } from './global'


const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    back: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
    },
    iconView: {
        alignSelf: 'center'
    },
    mainIcon: {
        borderColor: ACCENT_COLOR,
        borderWidth: 1,
        borderRadius: 80,
        padding: 20
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: SECONDARY_COLOR
    },
    slidingWindow: {
        flexDirection: 'row'
    },
    reviewView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
    },
    iconFlatList: {
        height: '50%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'green'
    },
    iconOption: {
        borderWidth: 1,
        borderColor: 'blue'
    }
});

export default styles;