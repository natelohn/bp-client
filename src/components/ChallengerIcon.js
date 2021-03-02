import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { Context as UserContext } from "../context/UserContext";
import { ACCENT_COLOR } from '../styles/global'
import { isRoboId } from '../utils';

const ChallengerIcon = ({ challengerId }) => {
    const userContext = useContext(UserContext);
    const isMe = challengerId === userContext.state.challengerId;
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