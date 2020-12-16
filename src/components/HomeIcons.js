import React from 'react';
import { Icon } from 'react-native-elements'
import styles from '../styles/homeIcons'
import { ACCENT_COLOR } from '../styles/global'





const HomeIcons = ({ reviewing, setReviewing }) => {

    const endReview = () => {
        // TODO: Make it a smoother transition
        setReviewing(false);
    }

    return (
        <>
        </>
    );
}


export default HomeIcons;