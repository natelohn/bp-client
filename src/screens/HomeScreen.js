import React, { useContext, useEffect, useReducer } from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/client';
import { PUSHOFF_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";

import LaunchView from '../components/LaunchView';
import ReviewPendingView from '../components/ReviewPendingView';
import PlayView from '../components/PlayView';

import styles from '../styles/home';



const reducer = (state, { type }) => {
    switch (type) {
        case 'launch_state':
            return { ...state, launch: true, reviewing: false, playing: false };
        case 'review_state':
            return { ...state, launch: false, reviewing: true, playing: false };
        case 'play_state':
            return { ...state, launch: false, reviewing: false, playing: true };
        case 'blank_state':
            return { ...state, launch: false, reviewing: false, playing: false };
        default:
            return state;
    }
};


const MS_POLLING = 120000; // 2 minutes

const HomeScreen = ({ navigation }) => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // State Management
    const [state, dispatch] = useReducer(reducer, {
        launch: false,
        reviewing: false,
        playing: false,
    });
    const { launch, reviewing, playing } = state;

    const { setPushOffData } = useContext(PushOffContext);

    // User's Push Data 
    const pushOffQuery = useQuery(PUSHOFF_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING });

    useEffect(() => {
        if (!pushOffQuery.loading) {
            setPushOffData(pushOffQuery.data, pushOffQuery.error, challengerId);
            dispatch({ type: 'launch_state' });
        }
    }, [ pushOffQuery.loading ]);

    useEffect(() => {
        const id = navigation.getParam('id');
        if (id) {
            const unsubscribe = navigation.addListener('didFocus', () => {
                dispatch({ type: 'play_state' });
            });
            return unsubscribe.remove;
        } else {
            const unsubscribe = navigation.addListener('didFocus', () => {
                dispatch({ type: 'launch_state' });
            });
            return unsubscribe.remove;
        }
    }, [ navigation ]);


    
    //Callback Functions
    const launchState = () => {
        dispatch({ type: 'launch_state' });
    }

    const reviewState = () => {
        dispatch({ type: 'review_state' });
    }

    const playState = () => {
        dispatch({ type: 'play_state' });
    }
    
    return (
        <View style={ styles.view } >
        { launch ?
            <LaunchView beginReview={ reviewState }/>
        : null }
        { reviewing ?
            <ReviewPendingView endReview={ launchState } beginPlay={ playState }/>
        : null }
        { playing ? 
            <PlayView/> 
        : null }
        </View>
    );
};

export default HomeScreen;