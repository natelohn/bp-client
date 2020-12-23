import { StyleSheet } from 'react-native';
import { MAIN_FONT_STYLE, PRIMARY_COLOR, ACCENT_COLOR, SECONDARY_COLOR, RESULT_TIME_WIDTH } from './global'

const textConstants = {
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR

}

const styles = StyleSheet.create({
    view: {
        borderBottomWidth: 1,
        borderColor: ACCENT_COLOR,
        flexDirection: 'row',
        backgroundColor: SECONDARY_COLOR,
        marginVertical: 1
    },
    infoView: {
        marginVertical: 5,
        marginLeft: 5
    },
    header: {
        flexDirection: 'row'
    },
    name: {
        ...textConstants,
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    subText: {
        ...textConstants,
        fontSize: 14,
    },
    radioView: {
        position: 'absolute',
        right: 5,
        alignSelf: 'center'
    },
   robo: {
        ...textConstants,
        marginRight: 5
    }
});

export default styles;