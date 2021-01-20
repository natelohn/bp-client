import { StyleSheet } from 'react-native';

import { MAIN_BUTTON_DIAMETER, SMALL_BUTTON_DIAMETER, PRIMARY_COLOR, ACCENT_COLOR, MAIN_FONT_STYLE } from './global'

const text = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
    textAlign: 'center'
}

const circleConstants = {
    zIndex : 0,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderColor: ACCENT_COLOR
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainCircle: {
        ...circleConstants,
        height: MAIN_BUTTON_DIAMETER,
        width: MAIN_BUTTON_DIAMETER,
        borderRadius: MAIN_BUTTON_DIAMETER / 2
    },
    smallCircle: {
        ...circleConstants,
        height: SMALL_BUTTON_DIAMETER,
        width: SMALL_BUTTON_DIAMETER,
        borderRadius: SMALL_BUTTON_DIAMETER / 2
    },
    text: {
        ...text,
        fontSize: 38,
    },
    smallText: {
        ...text,
        fontSize: 28
    }
});

export default styles;