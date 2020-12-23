import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, MAIN_FONT_STYLE, TOP_ICON_OFFSET, SECONDARY_COLOR, SIDE_ICON_OFFSET, PRIMARY_COLOR } from './global';

const styles = StyleSheet.create({
    screen: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: SECONDARY_COLOR,
    },
    exit: {
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
    selectedChallengers: {
        margin: 5,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
    },
    selectView: {
        borderColor: ACCENT_COLOR,
        borderWidth: 1
    },
    buttonView: {
        marginTop: '1%',
        marginBottom: '5%'
    },
    separatorView: {
        backgroundColor: ACCENT_COLOR
    },
    separatorMessage: {
        alignSelf: 'center',
        marginVertical: 5,
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 18,
        color: SECONDARY_COLOR
    }
});

export default styles;