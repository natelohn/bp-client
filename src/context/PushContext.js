import createDataContext from "./createDataContext";
import { sendServerAlert } from '../components/Alerts'
import { navigate } from "../navigationRef";


const pushReducer = (state, { type, allPushOffs, pendingPushOffList, pushOff, challengerData }) => {
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
        let roboChallengers = [];
        let allChallengersByID = {};
        for (let challenger of allChallengers){
            allChallengersByID[challenger.id] = challenger;
            if (roboChallengerIds.includes(challenger.id)) {
                roboChallengers.push(challenger);
                // TODO: Order the challengers
            }
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
            roboChallengers,
            formerChallengers
        }
        dispatch({ type: 'setChallengerData', challengerData });
    } else {
        sendServerAlert();
    }
}

export const {Provider, Context} = createDataContext(
    pushReducer,
    { setPushOffData, setPushOff, respondToPushOff, setChallengerData},
    { allPushOffs: {}, pendingPushOffList: [], pushOff: null, challengerData: {}}
);
