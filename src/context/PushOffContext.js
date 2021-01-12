import createDataContext from "./createDataContext";
import { sendServerAlert } from '../components/Alerts'
import { navigate } from "../navigationRef";


const pushOffReducer = (state, { type, allPushOffs, pendingPushOffList, pushOff, challengerData, newRecordData }) => {
    switch (type) {
        case 'setPushOffData':
            return {...state, allPushOffs, pendingPushOffList }
        case 'setPushOff':
            return {...state, pushOff}
        case 'respondToPushOff':
            const updatedPendingPushOffs = state.pendingPushOffList.filter(pendingPushOff => pendingPushOff.id != pushOff.id);
            let updatedAllPushOffs = state.allPushOffs;
            updatedAllPushOffs[pushOff.id] = pushOff;
            return {...state, allPushOffs: updatedAllPushOffs, pendingPushOffList: updatedPendingPushOffs }
        case 'setChallengerData':
            return {...state, challengerData }
        case 'createPushOff':
            let newAll = {...state.allPushOffs};
            newAll[pushOff.id] = pushOff;
            let newPending = [...state.pendingPushOffList];
            newPending.push(pushOff);
            return {...state, pushOff, allPushOffs: newAll, pendingPushOffList: newPending}
        case 'updateRecords':
            const oldChallengerData = state.challengerData.allChallengers;
            const newChallengerData = [];
            const newFormerChallengers = [...state.challengerData.formerChallengers];
            for(let challenger of oldChallengerData){
                if(challenger.id in newRecordData){
                    challenger = {...challenger, records: newRecordData[challenger.id]}
                    const found = state.challengerData.formerChallengers.find(ch => ch.id === challenger.id);
                    if (!found){
                        newFormerChallengers.push(challenger);
                    }
                }
                newChallengerData.push(challenger)
            }
            const updatedChallengerData = {...state.challengerData, allChallengers: newChallengerData, formerChallengers: newFormerChallengers}
            return {...state, challengerData: updatedChallengerData}
        default:
            return state;
  }
};

const setPushOffData = dispatch => (data, error, challengerId) => {
    if (!error) {
        let allPushOffs = {};
        let pendingPushOffList = [];
        for (let pushOff of data.getPushOffs) {
            allPushOffs[pushOff.id] = pushOff;
            if (!pushOff.final) {
                for (let pending of pushOff.pending) {
                    if (pending.challenger.id === challengerId) {
                        pendingPushOffList.push(pushOff);
                    }
                }
            }
        }
        // Sorted descending by date
        pendingPushOffList.sort(function(a,b){ return new Date(b.created) - new Date(a.created) });
        dispatch({ type: 'setPushOffData', allPushOffs, pendingPushOffList });
    } else {
        sendServerAlert();
    }
}

const setPushOff = dispatch => ( pushOff ) => {
    dispatch({ type: 'setPushOff', pushOff });
}

const respondToPushOff = dispatch => ( challengerId, pushOffId, duration, respondToPushOffCallback ) => {
    respondToPushOffCallback({ 
        variables: { input: { challengerId, pushOffId, duration }}
    })
    .then(async ({ data }) => {
        // if success -> go results screen
        const pushOff = data.respondToPushOff;
        dispatch({ type: 'respondToPushOff', pushOff });
        navigate("Results", { id: pushOff.id });
    })
    // if failure -> send server issue error
    .catch(( error ) => {
        sendServerAlert();
        // TODO: Come up with a way to not loose push time, Async Storage?
    });
}

const setChallengerData = dispatch => (data, error) => {
    if (!error) {
        const { challengerId, allChallengers, robos, unavailableChallengerIds } = data.challengerData;
        let roboChallengerIds = []
        for( let robo of robos){
           roboChallengerIds.push(robo.challenger.id); 
        };
        let allChallengersByID = {};
        for (let challenger of allChallengers){
            allChallengersByID[challenger.id] = challenger;
        }
        let formerChallengers = [];
        const myChallenger = allChallengersByID[challengerId];
        for(let record of myChallenger.records) {
            const hasRecord = record.won > 0 || record.lost > 0 || record.draw > 0;
            const notMe = record.opponent.id != challengerId; // TODO: Fix this error in the data model, no challenger should have a record vs. themselves
            if (hasRecord && notMe) {
                formerChallengers.push(allChallengersByID[record.opponent.id]);
            }
        }
        const challengerData = {
            challengerId, 
            allChallengers,
            unavailableChallengerIds,
            robos,
            formerChallengers
        }
        dispatch({ type: 'setChallengerData', challengerData });
    } else {
        sendServerAlert();
    }
}

const createPushOff = dispatch => (instigatorId, userChallengerIds, roboChallengerIds, createPushOffCallback) => {
    createPushOffCallback({
        variables: { input: { instigatorId, userChallengerIds, roboChallengerIds }}
    })
    .then(async ({ data }) => {
        // if success -> go results screen
        const pushOff = data.createPushOff;
        dispatch({ type: 'createPushOff', pushOff });
        // TODO: Add a trigger to start the push off
        navigate("Home", { id: pushOff.id });
    })
    // if failure -> send server issue error
    .catch(( error ) => {
        sendServerAlert();
    });
}

const updateRecords = dispatch => (data, error) => {
    if (!error) {
        const newRecordData = {};
        for(let newRecord of data.getChallengerRecords) {
            newRecordData[newRecord.id] = newRecord.records;
        }
        dispatch({type: "updateRecords", newRecordData });
    } else {
        sendServerAlert()
    }

}

export const {Provider, Context} = createDataContext(
    pushOffReducer,
    { setPushOffData, setPushOff, respondToPushOff, setChallengerData, createPushOff, updateRecords},
    { allPushOffs: {}, pendingPushOffList: [], pushOff: null, challengerData: {} }
);
