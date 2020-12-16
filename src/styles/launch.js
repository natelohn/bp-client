import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SIDE_ICON_OOFFSET, BUTTON_TOP_MARGIN } from './global'

const styles = StyleSheet.create({
    create: {
        color: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 22,
        textDecorationLine: 'underline',
        margin: 20
    },
    menuIcon: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OOFFSET
    },
    leaderboardIcon: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        right: SIDE_ICON_OOFFSET
    },
    buttonArea: {
        marginTop: 150
    }
});

export default styles;