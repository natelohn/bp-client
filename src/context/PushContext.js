import createDataContext from "./createDataContext";
import { sendServerAlert } from '../components/Alerts'

const pushReducer = (state, { type, pendingPushList, pushOff }) => {
  switch (type) {
    case 'pendingPushData':
        const hasPendingPushes = pendingPushList.length > 0;
        return {...state, pendingPushList, hasPendingPushes}
    case 'setPushOff':
        return {...state, pushOff}
    default:
        return state;
  }
};

const setPushData = dispatch => (data, error, challengerId) => {
    if (!error) {
        let pendingPushList = [];
        for (let pushOff of data.getPushOffs) {
            if (!pushOff.final) {
                for (let pending of pushOff.pending) {
                    if (pending.challenger.id === challengerId) {
                        pendingPushList.push(pushOff);
                    }
                }
            }
        }
        // Sorted descending by date
        pendingPushList.sort(function(a,b){ return new Date(b.created) - new Date(a.created) });
        dispatch({ type: 'pendingPushData', pendingPushList });
    } else {
        console.log(error);
        sendServerAlert();
    }
}

const setPushOff = dispatch => ( pushOff ) => {
    dispatch({ type: 'setPushOff', pushOff });    
}

export const {Provider, Context} = createDataContext(
    pushReducer,
    { setPushData, setPushOff},
    { pendingPushList: [], hasPendingPushes: false, pushOff: null }
);
