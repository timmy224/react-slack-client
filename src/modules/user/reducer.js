import types from "./types";


const initReducer = () =>{
    const INITIAL_STATE = {
        username: '',
        showTakenMsg: false,
    }

    const setUsername = ( state = INITIAL_STATE, action = {})=>{
        const { type, payload } = action;
        switch(type){
            case types.SET_USERNAME:
<<<<<<< HEAD
                return {...state, username:payload};
            case types.TAKEN_USERNAME:
                return {...state, showTakenMsg: payload};
=======
<<<<<<< HEAD
                return {.
                    ..state, 
                    username:payload};
            case types.TAKEN_USERNAME:
                return {
                    ...state, 
                    showTakenMsg: payload};
=======
                return {...state, username:payload};
            case types.TAKEN_USERNAME:
                return {...state, showTakenMsg: payload};
>>>>>>> dev
>>>>>>> dev
            default:
            return state;
        }};

        return  setUsername ;
};
export default initReducer

