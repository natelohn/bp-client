import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { useLazyQuery } from '@apollo/client';
import { CHALLENGER_DATA } from '../apollo/gql';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";
import { navigate } from '../navigationRef';
import ButtonView from '../components/ButtonView';
import LoadingView from '../components/LoadingView';
import styles from '../styles/launch'
import { ACCENT_COLOR } from '../styles/global'
import { sendServerAlert } from './Alerts';


const LaunchView = ({ beginReview }) => {
    // Prepare query for create screen
    const authContext = useContext(AuthContext)
    const challengerId = authContext.state.challengerId;
    const [ getChallengers, { called, loading, data, error } ] = useLazyQuery(CHALLENGER_DATA, { variables: { challengerId }, fetchPolicy: "cache-and-network" });
    const [ loadingChallengers, setLoadingChallengers ] = useState(false);
    useEffect(() => {
        setLoadingChallengers(loading)
        if(called && !loading) {
            if (error) {
                sendServerAlert();
            } else {
                const { challengerData } = data;
                navigate('Create', { challengerData });
            }
        }
    }, [called, loading]);

    // Context
    const { state } = useContext(PushOffContext);
    const { pendingPushOffList } = state;

    // Display Values/logic
    // TODO: Does this increment with each call?
    const hasPendingPushes = pendingPushOffList.length > 0;
    const newPushOffText = pendingPushOffList.length > 1 ? `New Push-Offs!` : `New Push-Off!`;

    // Callbacks
    const openMenu = () => {
        // TODO: Create an interactive menu...
        console.log('Open Menu');
    }
    
    const openLeaderboard = () => {
        // TODO: Create an interactive leaderboard screen...
        console.log('Open Leaderboard');
    }

    return (
        <>
        { loadingChallengers ?
        <LoadingView/>
        :
        <>
            <Icon
                name='bars'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.menuIcon}
                onPress={ openMenu }
            />
            <Icon
                name='clipboard-list'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.leaderboardIcon}
                onPress={ openLeaderboard }
            />
            <View style={styles.buttonArea}>
                { hasPendingPushes ?
                <>
                <ButtonView displayText={`${pendingPushOffList.length} ${newPushOffText}`} onPressCallback={beginReview}/>
                <TouchableOpacity onPress={getChallengers}>
                    <Text style={styles.create}>Create Push-Off</Text>
                </TouchableOpacity>
                </>
                :
                <ButtonView displayText={'Test Your Will!'} onPressCallback={getChallengers}/>
                }
            </View>
        </>
        }
        </>
    );
}


export default LaunchView;