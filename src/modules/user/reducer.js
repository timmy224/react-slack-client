import types from "./types";

const initReducer = () =>{
    const INITIAL_STATE = {
        username: '',
        usernames: [],
        showTakenMsg: false,
        form: {
            name: "",
            username: "",
            email: ""
        }
    }

    const reducer = ( state = INITIAL_STATE, action = {})=>{
        const { type, payload } = action;
        switch(type){
            case types.SET_USERNAME:
                return {
                    ...state, 
                    username:payload
                }; 
            case types.TAKEN_USERNAME:
                return {
                    ...state, 
                    showTakenMsg: payload
                };
            case types.FETCH_USERNAMES:
                return {
                    ...state,
                    usernames: payload
                };
            case types.FORM_FIELD_UPDATED:
                const { field, value } = payload;
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [field]: value
                    }
                };
            case types.RESET_FORM: 
                return {
                    ...state,
                    form: {
                        name: "",
                        username: "",
                        email: ""
                    }
                };
            default:
                return state;
        }};

        return  reducer;
};
export default initReducer

