import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        zIndex : 0,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: '#CF0000',
        borderColor: '#5C240F'
    },
    text: {
        fontSize: 42,
        fontFamily: 'TextMeOne_400Regular',
        color: '#5C240F'
    },
});

export default styles;