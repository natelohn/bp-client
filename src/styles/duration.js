import { StyleSheet } from 'react-native';
import { MAIN_FONT_STYLE, PRIMARY_COLOR, ACCENT_COLOR, SECONDARY_COLOR, RESULT_TIME_WIDTH } from './global'

const textConstants = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
    marginRight: 5
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 2,
        borderBottomWidth: 1,
        borderColor: ACCENT_COLOR
    },
    rank: {
        ...textConstants,
        fontSize: 14
    },
    name: {
        ...textConstants,
        fontSize: 18
    },
    robo: {
        ...textConstants
    },
    result: {
        ...textConstants,
        fontSize: 18
    },
    duration: {
        flexDirection: 'row'
    },
    bar: {
        position: 'absolute',
        height: 20,
        width: '100%',
        backgroundColor: PRIMARY_COLOR
    },
    durationTextView: {
        width: '100%',
        backgroundColor: SECONDARY_COLOR,
        zIndex: 1,
    },
    durationText: {
        ...textConstants,
        fontSize: 18,
        marginLeft: 5,
        width: RESULT_TIME_WIDTH
    }
});

export default styles;