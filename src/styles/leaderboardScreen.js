import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, SECONDARY_COLOR, SIDE_ICON_OFFSET, TOP_ICON_OFFSET } from './global'

const text = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR
}

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
    header: {
        flexDirection: 'row',
        paddingTop: TOP_ICON_OFFSET + 10,
    },
    title: {
        ...text,
        fontSize: 28,
        marginHorizontal: 10,
    },
    main: {
        flex: 1,
    }
});

export default styles;