import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, LayoutAnimation, Text, UIManager, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useLazyQuery } from '@apollo/client';
import { navigate } from "../navigationRef";
import { CHALLENGER_DATA } from '../apollo/gql';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";
import styles from '../styles/results';
import { ACCENT_COLOR, RESULT_TIME_WIDTH } from '../styles/global'
import Duration from '../components/Duration';
import ButtonView from '../components/ButtonView';
import LoadingView from '../components/LoadingView';
import { getPushOffResultIcon } from '../utils'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ResultsScreen = ({ navigation }) => {
    // Context
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state } = useContext(PushOffContext);
    const id = navigation.getParam('id');
    const pushOff = state.allPushOffs[id];

    // Layout Values
    const screenSize = Dimensions.get('window');
    const mainViewWidth = screenSize.width * 0.95;
    const mainViewHeight = screenSize.height * 0.9;
    const widthMultiplier = mainViewWidth - RESULT_TIME_WIDTH;

    // List Animation values
    let sortedPushList = [...pushOff.pushes].sort(function(a, b){ return b.duration - a.duration });
    const longestDuration = sortedPushList[0].duration;

    const [ foundUser, setFoundUser ] = useState(false);
    const [ wins, setWins ] = useState(0);
    const [ losses, setLosses ] = useState(0);
    const [ ties, setTies ] = useState(0);
    const [ currentIter, setCurrentIter ] = useState(1);
    const [ displayPushList, setDisplayPushList ] = useState([...pushOff.pushes, ...pushOff.pending]);

    const getUserDuration = () => {
        for (let push of pushOff.pushes) {
            if (push.challenger.id === challengerId) {
                return push.duration;
            }
        }
    }
    const userDuration = getUserDuration();

    useEffect(()=>{
        if (currentIter <= pushOff.pushes.length) {
            let interval = setInterval(() => {
                const pushIndex = sortedPushList.length - currentIter;
                const nextLowestPush = sortedPushList[pushIndex];
                let updatedDisplayList = displayPushList.filter(push => push.id != nextLowestPush.id);
                updatedDisplayList.splice(pushIndex, 0, nextLowestPush);
                // TODO: Fix slow/laggy transitions between screens
                LayoutAnimation.configureNext({
                    duration: 2000,
                    create: { type: 'linear', property: 'opacity' },
                    update: { type: 'spring', springDamping: 0.4 },
                    delete: { type: 'linear', property: 'opacity' } }
                );
                setDisplayPushList(updatedDisplayList);
                setCurrentIter(currentIter + 1);

                // Handle Wins/Losses
                const isUser = nextLowestPush.challenger.id === challengerId;
                const tiedWithUser = userDuration === nextLowestPush.duration;
                if (isUser){
                    setFoundUser(true);
                } else {
                    if (tiedWithUser) {
                        setTies(ties + 1);
                    } else if (foundUser) {
                        setLosses(losses + 1);
                    } else {
                        setWins(wins + 1);
                    }
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    });

    // Prepare query for create screen
    const [ getChallengers, { called, loading, data, error } ] = useLazyQuery(CHALLENGER_DATA, { variables: { challengerId }, fetchPolicy: "cache-and-network" });
    const [ loadingChallengers, setLoadingChallengers ] = useState(false);
    useEffect(() => {
        setLoadingChallengers(loading)
        if(called && !loading) {
            if (error) {
                sendServerAlert();
            } else {
                const rematchChallengerIds = [];
                for (let push of pushOff.pushes) {
                    if (push.challenger.id != challengerId) {
                        rematchChallengerIds.push(push.challenger.id)
                    }
                }
                const { challengerData } = data;
                navigate('Create', { challengerData, rematchChallengerIds });
            }
        }
    }, [called, loading]);

    const rank = pushOff.pushes.length - wins;
    const { title, color} = getPushOffResultIcon(rank, pushOff);
    const recordText = ties > 0 ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`;

    // TODO: Add a "push in progress" for pending pushes that are currently underway
    // TODO: Either ensure the list doesn't go over the screen height or make it scrollable if it does
    // TODO: Create a new 1 v. 1 view w/ just times
    return (
        <>
        { loadingChallengers ?
        <LoadingView/>
        :
        <View style={styles.view}>
            <Icon
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.backIcon}
                onPress={ () => navigate("History") }
            />
            <View style={{ height: mainViewHeight, width: mainViewWidth}}>
                <View style={styles.headerView}>
                    <Icon 
                        name={title}
                        type='font-awesome-5'
                        size={28}
                        color={ color }
                        containerStyle={styles.iconView}
                    />
                    <View style={styles.recordTextView}>
                        <Text style={styles.recordText}>Record:</Text>
                        <Text style={styles.recordText}>{recordText}</Text>
                    </View>
                </View>

                <View style={styles.durations}>
                    <FlatList
                        data={displayPushList}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        renderItem={({item, index}) => {
                            return (
                                <Duration
                                    result={item}
                                    rank={index + 1}
                                    windthMultiplier={widthMultiplier}
                                    longestDuration={longestDuration}
                                    challengerCount={pushOff.pushes.length}
                                    isPending={pushOff.pending.includes(item)}
                                />
                            );
                        }}
                    />
                </View>
                <View style={styles.buttonArea}>
                    <ButtonView displayText="Rematch" small={true} onPressCallback={getChallengers}/>
                </View>
            </View>
        </View>
        }
        </>
    );
};

export default ResultsScreen;