import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { Context as AuthContext } from "../context/AuthContext";
import { ACCENT_COLOR } from '../styles/global'
import { isRoboId } from '../utils';

const ChallengerIcon = ({ challengerId }) => {
    const authContext = useContext(AuthContext);
    const isMe = challengerId === authContext.state.challengerId;
    const isRobo = isRoboId(challengerId);
    const iconName = isMe ? 'user-check' : isRobo ? 'robot' : 'user-alt';
    const size = isMe ? 14 : 10;
    return (
        <>
        <Icon 
            name={iconName}
            type='font-awesome-5'
            size={size}
            color={ ACCENT_COLOR }
        />
        </>
    );
}


export default ChallengerIcon;