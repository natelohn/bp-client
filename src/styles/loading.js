import { StyleSheet } from 'react-native';
import { PLAYVIEW_HEADER_HEIGHT, SECONDARY_COLOR } from './global'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    buttonView: {
        marginTop: PLAYVIEW_HEADER_HEIGHT,
    }
});

export default styles;