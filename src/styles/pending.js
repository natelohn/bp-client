import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR, SECONDARY_COLOR} from './global'


const text = {
    textAlign: 'center',
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
    textShadowColor: ACCENT_COLOR,
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 10,
    width: '100%',
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
        fontSize: 32,
    },
    challenge: {
        ...text,
        fontSize: 24,
    },
    others: {
        ...text,
        fontSize: 18,
    },
    date: {
        ...text,
        fontSize: 18,
    }

});

export default styles;