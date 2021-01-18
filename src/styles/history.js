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
    headerText: {
        marginTop: TOP_ICON_OFFSET,
        fontSize: 30,
        alignSelf: 'center',
        fontFamily: MAIN_FONT_STYLE,
        color: ACCENT_COLOR,
    },
    pushOffList: {
        width: '100%',
        backgroundColor: ACCENT_COLOR
    }
});

export default styles;