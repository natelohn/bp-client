import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as PushOffContext } from '../context/PushOffContext';
import PushOffSummary from '../components/PushOffSummary';
import { navigate } from "../navigationRef";
import styles from '../styles/history';
import { ACCENT_COLOR } from '../styles/global';

const HistoryScreen = () => {
    const { state } = useContext(PushOffContext);
    const { allPushOffs, pendingPushOffList } = state;

    const buildDisplayList = () => {
        const pendingIds = [];
        for(let pendingPushOff of pendingPushOffList) {
            pendingIds.push(pendingPushOff.id);
        }
        const pushOffHistoryList = [];
        for(let id in allPushOffs) {
            if (!pendingIds.includes(id)) {
                pushOffHistoryList.push(allPushOffs[id])
            }
        }
        return pushOffHistoryList;
    }

    return (
        <View style={styles.view}>
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.back}
                onPress={ () => { navigate("Home") } }
            />
            <Text style={styles.headerText}>Push Off History</Text>
            <FlatList
                style={styles.pushOffList}
                data={buildDisplayList()}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <PushOffSummary pushOff={item}/>
                    );
                }}
            />
        </View>
    );
};

export default HistoryScreen;