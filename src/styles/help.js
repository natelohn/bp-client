import { StyleSheet } from 'react-native';
import { TOP_ICON_OFFSET, SECONDARY_COLOR, SIDE_ICON_OFFSET, MAIN_FONT_STYLE, ACCENT_COLOR, PRIMARY_COLOR } from './global'

const text = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
    textAlign: 'center'
}

const ICON_SIZE = 32;

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
    title: {
        ...text,
        fontSize: 26,
        marginTop: TOP_ICON_OFFSET,
        textDecorationLine: 'underline'
    },
    helpView: {
        flex: 1
    },
    helpInfoView: {
        marginVertical: 20
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 4
    },
    icon: {
        marginHorizontal: 10
    },
    text: {
        ...text,
        fontSize: 14,
        marginTop: 2,
        marginHorizontal: 26
    }
});

export default styles;