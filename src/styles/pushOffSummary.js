import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, RESULT_ICON_SIZE, SECONDARY_COLOR } from './global';

const text = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
}

const styles = StyleSheet.create({
    view: {
        margin: 2,
        backgroundColor: SECONDARY_COLOR,
        width: '100%',
    },
    parent: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70
    },
    iconView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ACCENT_COLOR,
        height: RESULT_ICON_SIZE,
        width: RESULT_ICON_SIZE,
        borderRadius: RESULT_ICON_SIZE / 2
    },
    headerView: {
        flex: 1,
        alignSelf: 'stretch',
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderColor: ACCENT_COLOR,
        marginLeft: 5,
    },
    headerText: {
        ...text,
        flex: 1,
        fontSize: 16,
        marginTop: 2
    },
    subText: {
        ...text,
        fontSize: 11,
    }
});

export default styles;