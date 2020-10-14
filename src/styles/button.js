import { StyleSheet } from 'react-native';

import { BUTTON_DIAMETER, PRIMARY_COLOR, ACCENT_COLOR, MAIN_FONT_STYLE } from './global'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        zIndex : 0,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: BUTTON_DIAMETER,
        width: BUTTON_DIAMETER,
        borderRadius: BUTTON_DIAMETER / 2,
        backgroundColor: PRIMARY_COLOR,
        borderColor: ACCENT_COLOR
    },
    text: {
        fontSize: 42,
        fontFamily: MAIN_FONT_STYLE,
        color: ACCENT_COLOR
    },
});

export default styles;