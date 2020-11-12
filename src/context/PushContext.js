import createDataContext from "./createDataContext";
import { sendServerAlert } from '../components/Alerts'

const pushReducer = (state, { type, pushesPending }) => {
  switch (type) {
      case 'push':
          return {...state, pushesPending }
      default:
          return state;
  }
};

const setPushData = dispatch => (data, error, challengerId) => {
    if (!error) {
        let pushesPending = [];
        for (let pushOff of data.getPushOffs) {
            if (!pushOff.final) {
                for (let pending of pushOff.pending) {
                    if (pending.challenger.id === challengerId) {
                        pushesPending.push(pushOff);
                    }
                }
            }
        }
        dispatch({ type: 'push', pushesPending });
    } else {
        console.log(error);
        sendServerAlert();
    }
}

export const {Provider, Context} = createDataContext(
    pushReducer,
    { setPushData },
    { pushesPending: null }
);
