import { StyleSheet } from 'react-native';

import { PLAY_HEADER_TOP_PADDING, TIMER_HEIGHT, CHALLENGER_HEIGHT, MAIN_FONT_STYLE, ACCENT_COLOR} from './global'


const headerText = {
    textAlign: 'center',
    position: 'absolute',
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR
}
const styles = StyleSheet.create({
    timer: {
        ...headerText,
        fontSize: 42,
        top: PLAY_HEADER_TOP_PADDING,
        height: TIMER_HEIGHT,
    },
    chalenger: {
        ...headerText,
        fontSize: 24,
        top: PLAY_HEADER_TOP_PADDING + TIMER_HEIGHT,
        height: CHALLENGER_HEIGHT,
    }
});

export default styles;