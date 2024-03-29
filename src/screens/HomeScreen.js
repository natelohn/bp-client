import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/client';
import { PUSHOFF_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";

import LaunchView from '../components/LaunchView';
import ReviewPendingView from '../components/ReviewPendingView';

import styles from '../styles/home';


const MS_POLLING = 120000; // 2 minutes

const HomeScreen = () => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // State Management
    const [ viewingPending, setViewingPending ] = useState(false);

    const { setPushOffData } = useContext(PushOffContext);

    // User's Push Data 
    const pushOffQuery = useQuery(PUSHOFF_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING });

    useEffect(() => {
        if (!pushOffQuery.loading) {
            setPushOffData(pushOffQuery.data, pushOffQuery.error, challengerId);
        }
    }, [ pushOffQuery.loading ]);
    
    return (
        <View style={ styles.view }>
        { !viewingPending ?
            <LaunchView viewPending={ () => { setViewingPending(true) } }/>
        : null }
        { viewingPending ?
            <ReviewPendingView endViewPending={ () => { setViewingPending(false) }}/>
        : null }
        </View>
    );
};

export default HomeScreen;