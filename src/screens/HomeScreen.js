import React, { useContext, useEffect, useState} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

import { useQuery } from '@apollo/client';
import { PUSHOFFS_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";

import Carousel from '../components/Carousel';
import PlayView from '../components/PlayView';
import HomeIcons from '../components/HomeIcons'

import styles from '../styles/home';


const MS_POLLING_FOR_NEW_PUSHOFFS = 600000; // 10 minutes

const HomeScreen = () => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // State Mgmt
    const [reviewChallenges, setReviewChallenges] = useState(false);

    // User's Push Data 
    const { loading, error, data } = useQuery(PUSHOFFS_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING_FOR_NEW_PUSHOFFS });
    const { state, setPushData } = useContext(PushContext);
    const { pushesPending } = state;
    const userHasPendingPushes = pushesPending ? pushesPending.length > 0 : false;
    const amountPending = userHasPendingPushes ? pushesPending.length : 0;

    useEffect(() => {
        if (!loading) {
            setPushData(data, error, challengerId);
        }
    }, [loading]);



    // SANDBOX

    return (
        <View style={ styles.view } >
            <HomeIcons/>
            { reviewChallenges ? <Carousel items={pushesPending} style={"pending"}/> : null }
            <PlayView showPendingAlert={reviewChallenges} pendingAmount={amountPending}/>
        </View>
    );
};

export default HomeScreen;