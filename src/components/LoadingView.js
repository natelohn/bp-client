import React, { useEffect, useRef, useState }from 'react';
import { Animated, Dimensions, View } from 'react-native';
import ButtonView from './ButtonView';
import { MAIN_BUTTON_DIAMETER, PLAY_BUTTON_TOP_MARGIN } from '../styles/global'
import styles from '../styles/loading';
import { getRandomInt } from '../utils';

const LoadingView = () => {
    const [ iteration, setIteration ] = useState(0);
    const [ countingUp, setCountingUp ] = useState(true);
    useEffect(()=>{
        let interval = setInterval(() => {
        if (iteration >= 2){
            if (countingUp) {
                setIteration((i) => i + 1);
            } else {
                setIteration((i) => i - 1);
            }
            if (countingUp && iteration === 9) {
                setCountingUp(false)
            } else if (!countingUp && iteration === 4) {
                setCountingUp(true)
            }
        } else {
            setIteration((i) => i + 1);
        }
        }, 100);
        return () => {
            clearInterval(interval);
        }; 
    });


    // Animation
    const screenSize = Dimensions.get('window');
    const screenWidth = screenSize.width;
    const screenHeight = screenSize.height;
    const buttonRadius = MAIN_BUTTON_DIAMETER / 2;
    const maxWidthChange = (screenWidth / 2) - buttonRadius;
    const minWidthChange = -1 * maxWidthChange;
    const maxHeightChange = (screenHeight / 2) - buttonRadius - (PLAY_BUTTON_TOP_MARGIN / 2);
    const minHeightChange = (-1 * maxHeightChange) - PLAY_BUTTON_TOP_MARGIN;
    const midWidth = 0;
    const midHeight = 0;
    const buttonX = useRef(new Animated.Value(midWidth)).current;
    const buttonY = useRef(new Animated.Value(midHeight)).current;

    const moveButton = (x, y, duration) => {
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

    const moveButtonRandomly = () => {
        const newX = getRandomInt(minWidthChange,  maxWidthChange);
        const newY = getRandomInt(minHeightChange,  maxHeightChange);
        moveButton(newX, newY, 500);
    }

    return (
        <View style={styles.view}>
            <Animated.View style={[{ ...styles.buttonView, transform: [{ translateX: buttonX }, { translateY: buttonY }]}]}>
                <ButtonView onPressCallback={moveButtonRandomly} displayText={'Loading'} textOpacity={iteration / 10}/>
            </Animated.View>
        </View>
    );
};

export default LoadingView;