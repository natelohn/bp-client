import createDataContext from "./createDataContext";
import { sendServerAlert } from '../components/Alerts'
import { navigate } from "../navigationRef";

const pushReducer = (state, { type, allPushOffs, pendingPushOffList, pushOff }) => {
    switch (type) {
        case 'setPushOffData':
            return {...state, allPushOffs, pendingPushOffList, hasPendingPushes: pendingPushOffList.length > 0}
        case 'setPushOff':
            return {...state, pushOff}
        case 'respondToPushOff':
            newList = state.pendingPushOffList.filter(pendingPushOff => pendingPushOff.id != pushOff.id);
            return {...state, pendingPushOffList: newList, hasPendingPushes: newList.length > 0}
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
        console.log(error);
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
        console.log(error);
        sendServerAlert();
        // TODO: Come up with a way to not loose push time, Async Storage?
    });
}

export const {Provider, Context} = createDataContext(
    pushReducer,
    { setPushOffData, setPushOff, respondToPushOff},
    { allPushOffs: [], pendingPushOffList: [], hasPendingPushes: false, pushOff: null }
);
