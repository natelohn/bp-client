import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { Context as PushContext } from "../context/PushContext";
import { navigate } from '../navigationRef';
import ButtonView from '../components/ButtonView';
import styles from '../styles/launch'
import { ACCENT_COLOR } from '../styles/global'


const LaunchView = ({ beginReview }) => {
    // Context
    const { state } = useContext(PushContext);
    const { pendingPushOffList } = state;
    

    // Display Values/logic
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
            <TouchableOpacity onPress={() => navigate("Create")}>
                <Text style={styles.create}>Create Push-Off</Text>
            </TouchableOpacity>
            </>
            : 
            <ButtonView displayText={'Test Your Will!'} onPressCallback={() => navigate("Create")}/>
            }
        </View>
        </>
    );
}


export default LaunchView;