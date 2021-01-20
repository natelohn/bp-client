import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, RESULT_ICON_SIZE, SECONDARY_COLOR, SIDE_ICON_OFFSET , TOP_ICON_OFFSET} from './global'

// TODO: Figure out a way to programatically find these values

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    backIcon: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET,
        zIndex: 1
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ACCENT_COLOR,
        height: RESULT_ICON_SIZE,
        width: RESULT_ICON_SIZE,
        borderRadius: RESULT_ICON_SIZE / 2,
        marginRight: 5
    },
    recordTextView: {
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderColor: ACCENT_COLOR
    },
    recordText: {
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 18,
        color: ACCENT_COLOR
    },       
    durations: {
        flex: 1
    },
    buttonArea: {
        top: 10
    }
});

export default styles;