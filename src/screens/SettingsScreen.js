import React, { useState, useContext }  from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME } from '../apollo/gql';
import { Context as AuthContext } from '../context/AuthContext';
import ButtonView from '../components/ButtonView';
import { navigate } from "../navigationRef";
import styles from '../styles/settings';
import { ACCENT_COLOR } from '../styles/global';

const SettingsScreen = () => {
    const { state, signout, updateUsername } = useContext(AuthContext)
    const { challengerId, username } = state;
    const [ newUsername, setNewUsername ] = useState(username)
    const [ callUpdateUsername ] = useMutation(UPDATE_USERNAME);
    const invalidUsername = username === newUsername || newUsername.length === 0;


    const tryUsernameUpdate = () => {
        updateUsername(challengerId, newUsername, callUpdateUsername)
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
            <Text style={styles.editPrompt}>Edit Username:</Text>
            <TextInput 
                style={styles.textInput}
                placeholder={'Enter new username...'}
                value={newUsername}
                maxLength={32}
                autoCompleteType={'username'}
                onChangeText={(username) => { setNewUsername(username) }}
                autoFocus={false}
                blurOnSubmit={false}
            />
            <View style={styles.buttonView}>
                <ButtonView
                    displayText={'Update'}
                    onPressCallback={tryUsernameUpdate}
                    disabled={invalidUsername}
                    small={true}
                />
            </View>
            <TouchableOpacity onPress={signout}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;