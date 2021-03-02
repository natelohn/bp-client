import createDataContext from "./createDataContext";

const authReducer = (state, {type, user}) => {
  switch (type) {
    case 'setUser':
        return {...state, user};
    default:
        return state;
  }
};

// TODO:
// Use the user's # to check and see if the user 'exists' within our DB
// If they do, redirect to the HomeScreen
// If not, redirect users to a Create User screen

const setUser = dispatch => ( user ) => {
    dispatch({ type: 'setUser', user });
}

export const { Provider, Context } = createDataContext(authReducer, { setUser }, { user: null });