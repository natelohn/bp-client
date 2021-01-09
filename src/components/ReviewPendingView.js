import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import ButtonView from './ButtonView'
import Carousel from './Carousel' 
import { showForfeitPrompt } from './Alerts'
import { Context as PushContext } from '../context/PushContext';
import { ACCENT_COLOR } from '../styles/global'
import styles from '../styles/reviewPending'

const ReviewPendingView = ({ endReview, beginPlay }) => {
    // Context
    const { state } = useContext(PushContext);
    const { pendingPushOffList, pushOff } = state;

    useEffect(() => {
        showCarosel();
    });

    // Animation
    const offScreenRight = Dimensions.get('window').width;
    const onScreen = 0;
    const carouselX = useRef(new Animated.Value(offScreenRight)).current;

    const showCarosel = () => {
        Animated.timing(carouselX, {
            toValue: onScreen,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const backToLaunch = () => {
        Animated.timing(carouselX, {
            toValue: offScreenRight,
            duration: 100,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                endReview();
            }
        });
    }

    // Callbacks
    const forfeitCallback = () => {
        console.log("Forfeit")
        // TODO: Add forfeit API call
    }
    
    const forfeitPushOff = () => {
        const instigatorName = pushOff.instigator.username;
        const totalLosses = pushOff.pending.length + pushOff.pushes.length - 1;
        showForfeitPrompt(forfeitCallback, instigatorName, totalLosses)
    }
    
    

    return (
        <>
            <Icon 
                name='window-close'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.exit}
                onPress={ backToLaunch }
            />
            <Carousel
                items={pendingPushOffList}
                style={"pending"}
                carouselX={carouselX}
            />
            <ButtonView displayText={'Begin'} onPressCallback={beginPlay}/>
            <TouchableOpacity onPress={forfeitPushOff}>
                <Text style={styles.create}>Forfeit</Text>
            </TouchableOpacity>
        </>
    );
}

export default ReviewPendingView;