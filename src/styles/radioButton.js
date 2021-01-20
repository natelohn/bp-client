import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, ACCENT_COLOR, SECONDARY_COLOR } from './global'

const BUTTON_SIZE = 24;

const styles = StyleSheet.create({
    radioButton: {
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 2,
        borderColor: ACCENT_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: PRIMARY_COLOR,
    }
});

export default styles;