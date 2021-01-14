import { StyleSheet } from 'react-native';
import { TOP_ICON_OFFSET, SECONDARY_COLOR, SIDE_ICON_OFFSET } from './global'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    back: {
        position: 'absolute',
        top: TOP_ICON_OFFSET,
        left: SIDE_ICON_OFFSET
    },
});

export default styles;