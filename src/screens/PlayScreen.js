import React, { useReducer, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import ButtonView from '../components/ButtonView';
import { getRandomInt } from '../utils';

const reducer = (state, {type}) => {
    switch (type) {
        case 'begin_pushing':
            return {
                ...state,
                pushing: true,
                buttonText: '',
                
            };
        case 'end_pushing':
            return {
                ...state,
                pushing: false,
                buttonText: 'Begin'
            };
        default:
            return state;
    }
};

const PlayScreen = () => {
    const [state, dispatch] = useReducer(reducer, {
        pushing: false,
        buttonText: 'Begin',
    });
    const { pushing, buttonText } = state;

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const buttonDiameter = 200;
    const buttonRadius = buttonDiameter / 2;
    // Will need to be recalculated once button is styled on screen
    const maxWidthChange = (screenWidth / 2) - buttonRadius;
    const minWidthChange = -1 * maxWidthChange;
    const maxHeightChange = screenHeight - buttonDiameter;
    const minHeightChange = 0;

    const buttonX = useRef(new Animated.Value(0)).current;
    const buttonY = useRef(new Animated.Value(0)).current;

    const press = () => {
        if (!pushing) {
            dispatch({type: 'begin_pushing'});
        }
        const newX = getRandomInt(minWidthChange,  maxWidthChange);
        const newY = getRandomInt(minHeightChange,  maxHeightChange);
        moveButton(newX, newY)
    }

    const moveButton = (x, y) => {
        const duration = 500;
        Animated.timing(buttonX, {
            toValue: x,
            duration,
            useNativeDriver: true
        }).start();
        Animated.timing(buttonY, {
            toValue: y,
            duration,
            useNativeDriver: true
        }).start();
    }

    const endPushing = () => {
        moveButton(0, 0);
        dispatch({type: 'end_pushing'});
    }

    return (
        <View>
        <Animated.View style={[{transform: [{translateX: buttonX}, {translateY: buttonY}]}]}>
            <ButtonView onPressCallback={press} text={buttonText} />
        </Animated.View>
        <TouchableOpacity onPress={endPushing}>
            <Text>END</Text>
        </TouchableOpacity>
        </View>

        
    );
};

export default PlayScreen;