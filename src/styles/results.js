import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR, MAIN_FONT_STYLE, ACCENT_COLOR } from './global'

// TODO: Figure out a way to programatically find these values
export const TOP_OFFSET = 40;
const SIDE_OFFSET = 20;

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    backIcon: {
        position: 'absolute',
        top: TOP_OFFSET,
        left: SIDE_OFFSET,
        zIndex: 1
    },
    recordView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    record: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 22
    },
    recordText: {
        fontFamily: MAIN_FONT_STYLE,
        fontSize: 58,
        color: ACCENT_COLOR
    },
    durations: {
        flex: 3,
    },
    buttonArea: {
        flex: 1,
        marginTop: 10
    }
});

export default styles;