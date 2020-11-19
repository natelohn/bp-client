import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR } from './global'


const text = {
    textAlign: 'center',
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
    width: '100%',
}

const shaddowText = {
    textShadowColor: ACCENT_COLOR,
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 10,
}

const styles = StyleSheet.create({
    view: {
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center"
    },
    name: {
        ...text,
        ...shaddowText,
        fontSize: 32,
    },
    challenge: {
        ...text,
        ...shaddowText,
        fontSize: 24,
    },
    others: {
        ...text,
        ...shaddowText,
        fontSize: 18,
    },
    date: {
        ...text,
        ...shaddowText,
        fontSize: 18,
    },
    forfeit: {
        ...text,
        fontSize: 22,
        textDecorationLine: 'underline',
        marginTop: 10
    }

});

export default styles;