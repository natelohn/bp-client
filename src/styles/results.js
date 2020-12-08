import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR } from './global'

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
        left: SIDE_OFFSET
    },
    record: {
        backgroundColor: 'blue',
        flex: 1
    },
    durations: {
        backgroundColor: 'green',
        flex: 2
    },
    buttonArea: {
        backgroundColor: 'yellow',
        flex: 1
    }
});

export default styles;