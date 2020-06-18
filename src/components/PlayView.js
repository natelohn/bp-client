import React, { useReducer } from 'react';
import { Button, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const reducer = (state, action) => {
    switch (action.type) {
        case 'push_button':
            return {...state, score: state.score + 1};
        case 'finish_play':
            return state.score >= state.scoreToBeat
                ? {...state, playing: false, victories: state.victories + 1}
                : {...state, playing: false, losses: state.losses + 1};
        case 'reset':
            return {...state, score: 0, playing: true, scoreToBeat: Math.round(state.scoreToBeat * 1.25 )};
        default:
            return state;
    }
};


const PlayView = ({ mode }) => {
    const easyMode = mode === 'easy';
    const scoreMultiplier = (easyMode) ? 10 : 100;
    const [state, dispatch] = useReducer(reducer, {
        playing: true,
        victories: 0,
        losses: 0,
        score: 0,
        scoreToBeat: Math.round(Math.random() * scoreMultiplier) + (scoreMultiplier / 10)
    });
    const {score, playing, scoreToBeat, victories, losses} = state;
    let won = !playing && score >= scoreToBeat;
    let lost = !playing && !won;
    return (
        <View style={styles.view}>
            {playing ?
                <TouchableOpacity style={styles.circle} onPress={() => dispatch({type: 'push_button'})}>
                    {easyMode ? <Text style={styles.count}>{score}</Text>: null}
                </TouchableOpacity>
                : null}
            {playing ? <Button title="I'm Done"  onPress={() => dispatch({type: 'finish_play'})} />: null}
            {won ? <Text style={styles.win}>You Win!</Text>: null}
            {lost ? <Text style={styles.loss}>You Lose :(</Text>: null}
            {!playing ? <Text>Pushes: {score}, Target: {scoreToBeat}</Text>: null}
            {!playing ? <Text style={styles.record}>Record: {victories}-{losses}</Text>: null}
            {!playing ? <Button title="Play Again" onPress={() => dispatch({type: 'reset'})} />: null}
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        marginTop: 150,
        borderWidth:2,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:200,
        height:200,
        backgroundColor:'#B22222',
        borderRadius:100,
    },
    count: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    view: {
        alignItems: 'center'
    },
    win: {
        fontWeight: 'bold',
        fontSize: 68,
        marginTop: 20,
        color: '#228B22'
    },
    loss: {
        fontWeight: 'bold',
        fontSize: 68,
        marginTop: 20,
        color: '#FF0000'
    },
    record: {
        fontSize: 28,
        marginTop: 5
    }
});

export default PlayView;

