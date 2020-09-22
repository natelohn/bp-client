import React, { useReducer } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonView from '../components/ButtonView'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1
    },
    subButton: {
        alignSelf: 'center',
        color: '#5C240F',
        fontSize: 24,
        textDecorationLine: 'underline',
        fontFamily: 'TextMeOne_400Regular',
        margin: 20
    },
    inputView: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20,
        color: '#5C240F'
    },
    textInput: {
        height: 40,
        margin: 10,
        borderBottomColor: '#5C240F',
        borderBottomWidth: 0.25,
        fontFamily: 'TextMeOne_400Regular',
        fontSize: 18,
       
    }
});

const reducer = (state, action) => {
    switch (action.type) {
        case 'sub_button':
            return { ...state,
                    signingUp: !state.signingUp,
                    buttonText: state.subButtonText,
                    subButtonText: state.buttonText };
        default:
            return state;
    }
};

const LaunchScreen = () => {
    const [state, dispatch] = useReducer(reducer, {
        signingUp: true,
        buttonText: 'Sign Up',
        subButtonText: 'Login'
    });
    const { signingUp, buttonText, subButtonText} = state;
    
    const pressSignUp = () => {
        console.log('Sign Up', signingUp);
        console.log('---------------------------------');
        
    }

    const pressLogIn = () => {
        console.log('Log In', !signingUp);
        console.log('---------------------------------');
    }

    const mainButtonPressed = () => {
        console.log('Main');
        if (signingUp) {
            pressSignUp()
        } else {
            pressLogIn()
        };
    }
    
    return (
        <View style={styles.view}>
            <View style={styles.inputView}>
                {signingUp ? <TextInput style={styles.textInput} placeholder='Username'/> : null }
                <TextInput style={styles.textInput} placeholder='Phone'/>
            </View>
            <ButtonView text={buttonText} onPressCallback={mainButtonPressed}/>
            <TouchableOpacity onPress={() => dispatch({type: 'sub_button'})}>
                <Text style={styles.subButton}>{subButtonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LaunchScreen;