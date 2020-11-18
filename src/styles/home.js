import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR, ACCENT_COLOR, MAIN_FONT_STYLE } from './global'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    create: {
        color: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 22,
        textDecorationLine: 'underline',
        margin: 20
    }
});

export default styles;