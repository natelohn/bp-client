import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from "../navigationRef";
import styles from '../styles/pushOffSummary';
import { addOrdinalSuffix, formatShortDate, formatResultTime, getPushOffResultIcon, getDisplayUsername } from '../utils';

const PushOffSummary = ({ pushOff }) => {
    let sortedPushList = [...pushOff.pushes].sort(function(a, b){ return b.duration - a.duration });
    const { state } = useContext(AuthContext);
    const { challengerId } = state;
    
    
    // Get values needed for display information
    let rank = 1;
    let myPush = null;
    for(let push of sortedPushList) {
        if (push.challenger.id === challengerId) {
            myPush = push;
        }
        if (!myPush){
            rank = rank + 1;
        }
    };

    const getHeaderText = (pushOff, myPush, winningPush) => {
        if (!pushOff.final) {
            return 'Awaiting Result...'
        } else {
            const strong = pushOff.pushes.length > 2 ? 'strongest' : 'stronger';
            const winnersName = winningPush === myPush ? `Your` : `${getDisplayUsername(winningPush.challenger.username, 28)}'s`;
            const suffix = winningPush === myPush ? `!` : `...`;
            return `${winnersName} will was ${strong}${suffix}`
        }
    }

    const { title, color} = getPushOffResultIcon(rank, pushOff);
    
    const headerText = getHeaderText(pushOff, myPush, sortedPushList[0]);
    
    const ordinalRank = addOrdinalSuffix(rank);
    const resultPrefix = pushOff.final ? "Placed " : "Currently, "
    const otherCompetitors = pushOff.pushes.length + pushOff.pending.length;
    const rankText = resultPrefix.concat(`${ordinalRank} of ${otherCompetitors}`);

    const { completed, duration } = myPush;
    const dateDisplay = formatShortDate(completed);
    const durationDisplay = duration > 0 ? `Pushed for ${formatResultTime(duration)}` : formatResultTime(duration);
    const myPushText = `${durationDisplay} on ${dateDisplay}`;

    return (
        <TouchableOpacity style={styles.view} onPress={ () => navigate("Results", { id: pushOff.id })}>
            <View style={styles.parent}>
                <View style={styles.iconView}>
                    <Icon 
                        name={title}
                        type='font-awesome-5'
                        size={28}
                        color={ color }
                    />
                </View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.subText}>{rankText}</Text>
                    <Text style={styles.subText}>{myPushText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default PushOffSummary;

