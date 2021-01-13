import { StyleSheet } from 'react-native';

import { 
    ACCENT_COLOR,
    MAIN_FONT_STYLE,
    PLAY_BUTTON_TOP_MARGIN,
    PLAYVIEW_CHALLENGER_HEIGHT,
    PLAYVIEW_HEADER_TOP_PADDING,
    PLAYVIEW_OTHERS_HEIGHT,
    PLAYVIEW_TIMER_HEIGHT,
    SECONDARY_COLOR

} from './global'
    
    
const headerText = {
    textAlign: 'center',
    position: 'absolute',
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
    challenger: {
        ...headerText,
        fontSize: 24,
        top: PLAYVIEW_HEADER_TOP_PADDING,
        height: PLAYVIEW_CHALLENGER_HEIGHT,
    },
    others: {
        ...headerText,
        fontSize: 18,
        top: PLAYVIEW_HEADER_TOP_PADDING + PLAYVIEW_CHALLENGER_HEIGHT,
        height: PLAYVIEW_OTHERS_HEIGHT,
    },
    timer: {
        ...headerText,
        fontSize: 42,
        top: PLAYVIEW_HEADER_TOP_PADDING + PLAYVIEW_CHALLENGER_HEIGHT + PLAYVIEW_OTHERS_HEIGHT,
        height: PLAYVIEW_TIMER_HEIGHT
    },
    buttonView: {
        marginTop: PLAY_BUTTON_TOP_MARGIN
    }
});

export default styles;