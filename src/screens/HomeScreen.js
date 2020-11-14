import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/client';
import { PUSHOFFS_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";

import Carousel from '../components/Carousel';
import PlayView from '../components/PlayView';

import styles from '../styles/home';

const MS_POLLING_FOR_NEW_PUSHOFFS = 600000; // 10 minutes

const HomeScreen = () => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // User's Push Data 
    const { loading, error, data } = useQuery(PUSHOFFS_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING_FOR_NEW_PUSHOFFS });
    const { state, setPushData } = useContext(PushContext);
    const { pushesPending } = state;

    useEffect(() => {
        if (!loading) {
            setPushData(data, error, challengerId);
        }
    }, [loading]);

    // SANDBOX


    return (
        <View style={ styles.view } >
            { pushesPending ? <Carousel items={pushesPending} style={"pending"}/> : null }
            <PlayView/>
        </View>
    );
};

export default HomeScreen;