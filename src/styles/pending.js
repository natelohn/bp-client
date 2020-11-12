import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR, SECONDARY_COLOR} from './global'


const text = {
    textAlign: 'center',
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: SECONDARY_COLOR,
        alignSelf: "center"
    },
    name: {
        ...text,
        fontSize: 28,
        backgroundColor: 'white',
    }

});

export default styles;