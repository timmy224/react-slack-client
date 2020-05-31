import { SET_USERNAME, TAKEN_USERNAME, MESSAGE_RECEIVED } from './constants.js'


const initReducer = () =>{
    const INITIAL_STATE = {
        username: '',
        showTakenMsg: false,
        messages:[]
    }

    const setUsername = ( state = INITIAL_STATE, action = {})=>{
        const { type, payload } = action;
        switch(type){
            case SET_USERNAME:
                return {...state, username:payload};
            case TAKEN_USERNAME:
                return {...state, showTakenMsg: true};
            case MESSAGE_RECEIVED:
                return { ...state, messages:[...state.messages, payload]}
            default:
            return state;
        }};

        return  setUsername ;
};
export default initReducer

