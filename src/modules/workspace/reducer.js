import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        /* TODO: update this to be null when we actually start fetching all of the orgs a user 
        belongs to and can switch between orgs */
        org: 1,         
    };
    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;