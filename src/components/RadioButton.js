import React from 'react';
import { View } from 'react-native';
import styles from '../styles/radioButton'

// Taken from example here: 
// https://stackoverflow.com/a/36229563/14846515
const RadioButton = ({ selected }) => {

    return (
        <View style={styles.radioButton}>
            { selected ?
            <View style={styles.selected}/>
            : null }
        </View>
    );
  }
  
  

  export default RadioButton;