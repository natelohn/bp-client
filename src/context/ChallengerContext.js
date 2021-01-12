import createDataContext from "./createDataContext";

const challengerReducer = (state, { type }) => {
    switch (type) {
        case 'setChallengerData':
            return {...state, challengerData }
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
    challengerReducer,
    { setChallengerData,  updateRecords },
    { challengerData: {} }
);