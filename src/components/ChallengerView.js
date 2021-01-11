import React, { useContext, useState } from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { showPendingChallengerUnavailableMessage} from '../components/Alerts'
import RadioButton from './RadioButton';
import {Context as AuthContext} from '../context/AuthContext';
import styles from '../styles/challenger'
import {getTotalAndVSRecords} from '../utils';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global'

const Challenger = ({ available, maxSelected, challenger, onSelectCallback, roboData, isSelected }) => {
    const { state } = useContext(AuthContext);
    const { challengerId } = state;
    const { total, opponentRecord } = getTotalAndVSRecords(challenger.records, challengerId);
    const totalRecord = total.draw > 0 ? `${total.won}-${total.lost}-${total.draw}` : `${total.won}-${total.lost}`
    const showVs = opponentRecord.won > 0 || opponentRecord.lost > 0  || opponentRecord.draw > 0 
    const vsUserRecord = opponentRecord.draw > 0 ? `${opponentRecord.won}-${opponentRecord.lost}-${opponentRecord.draw}` : `${opponentRecord.won}-${opponentRecord.lost}`
    const header = showVs ? `${challenger.username} (${vsUserRecord})` : `${challenger.username}`;
    const [ selected, setSelected ] = useState(isSelected);
    const opacity = available ? 1 : 0.4;    

    const selectChallenger = () => {
        if (available) {
            const isSelected = !selected;
            onSelectCallback(challenger, isSelected);
            setSelected(isSelected)
        } else {
            showPendingChallengerUnavailableMessage(challenger.username)
        }

    }
    return (
        <View style={{ ...styles.view, opacity}}>
            <View style={styles.infoView}>
                <View style={styles.header}> 
                    <Text style={styles.name}>{header}</Text>
                    { roboData.isRobo ? 
                    <Icon 
                        name='robot'
                        type='font-awesome-5'
                        size={10}
                        color={ ACCENT_COLOR }
                        containerStyle={styles.robo}
                    /> : null }
                </View>
                <Text style={styles.subText}>Overall Record: {totalRecord}</Text>
                { roboData.isRobo ? <Text style={styles.subText}>Difficulty {roboData.difficulty}</Text> : null }
            </View>
            <TouchableOpacity style={styles.radioView} onPress={selectChallenger}>
                { available ?
                <RadioButton selected={selected}/> 
                : !maxSelected ?
                 <Icon 
                    name='info-circle'
                    type='font-awesome-5'
                    size={18}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.robo}
                /> 
                : null }
                
            </TouchableOpacity>
        </View>
    );
}


export default Challenger;