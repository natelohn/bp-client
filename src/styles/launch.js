import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SIDE_ICON_OFFSET, PRIMARY_COLOR } from './global'

const BUBBLE_SIZE = 500;
const BUBBLE_ICON_LARGE_OFFSET = 140;
const BUBBLE_ICON_SMALL_OFFSET = 60;

const styles = StyleSheet.create({
    create: {
        color: ACCENT_COLOR,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 22,
        textDecorationLine: 'underline',
        margin: 20
    },
    settingsIcon: {
        zIndex: 1,
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
    },
    reviewIcon: {
        zIndex: 1,
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        right: SIDE_ICON_OFFSET
    },
    buttonArea: {
        marginTop: 150
    },
    reviewBubble: {
        position: 'absolute',
        top: -1 * (BUBBLE_SIZE / 2),
        right: -1 * (BUBBLE_SIZE / 1.75),
        height: BUBBLE_SIZE,
        width: BUBBLE_SIZE,
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        borderRadius: BUBBLE_SIZE / 2
    },
    settingsBubble: {
        position: 'absolute',
        top: -1 * (BUBBLE_SIZE / 2),
        left: -1 * (BUBBLE_SIZE / 1.75),
        height: BUBBLE_SIZE,
        width: BUBBLE_SIZE,
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        borderRadius: BUBBLE_SIZE / 2
    },
    historyIcon: {
        position: 'absolute',
        bottom: BUBBLE_ICON_LARGE_OFFSET,
        left: BUBBLE_ICON_SMALL_OFFSET
    },
    leaderboardIcon: {
        position: 'absolute',
        bottom: BUBBLE_ICON_SMALL_OFFSET,
        left: BUBBLE_ICON_LARGE_OFFSET,
    },
    userIcon: {
        position: 'absolute',
        bottom: BUBBLE_ICON_LARGE_OFFSET,
        right: BUBBLE_ICON_SMALL_OFFSET
    },
    helpIcon: {
        position: 'absolute',
        bottom: BUBBLE_ICON_SMALL_OFFSET,
        right: BUBBLE_ICON_LARGE_OFFSET,
    },
});

export default styles;