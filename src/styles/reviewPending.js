import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SIDE_ICON_OFFSET } from './global';

const styles = StyleSheet.create({
    exit: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
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