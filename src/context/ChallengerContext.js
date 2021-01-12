import createDataContext from "./createDataContext";

const challengerReducer = (state, { type }) => {
    switch (type) {
        default:
            return state;
  }
}

export const {Provider, Context} = createDataContext(
    challengerReducer,
    {},
    {}
);