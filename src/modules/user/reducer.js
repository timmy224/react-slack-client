import { SET_USERNAME, TAKEN_USERNAME, CHANGE_ROUTE, ROUTE_TO_ALERT, MESSAGE_RECEIVED } from './constants.js'
// import types from "./types";
const initReducer = () =>{
    const INITIAL_STATE = {
        username: '',
        showTakenMsg: false,
        routePath: null,
        routeState: {},
        messages:[]
    }

    const setUsername = ( state = INITIAL_STATE, action = {})=>{
        const { type, payload } = action;
        switch(type){
            case SET_USERNAME:
                return {...state, username:payload};
            case ROUTE_TO_ALERT:
                return {...state, routePath:payload,
                                    routeState: { alert: "Web socket connection error " }};
            case TAKEN_USERNAME:
                return {...state, showTakenMsg: true};
            case CHANGE_ROUTE:
                return { ...state, routePath:payload}
            case MESSAGE_RECEIVED:
                return { ...state, messages:[...state.messages, payload]}
            default:
            return state;
        }};

        return  setUsername ;
};
export default initReducer


//BELOW IS MY MESSAGE_LIST REDUCER ATTEMPT
// case types.MESSAGE_LIST:
            //     return {...state, messages:payload}


//BELOW IS THE SAMPLE REDUCER FROM ROBOFRIENDS
// const initialStateSearch ={
//     searchField:'',
// }

// export const searchRobots = (state=initialStateSearch, action={})=>{
//     switch(action.type){
//         case CHANGE_SEARCHFIELD:
//             return {...state, searchField:action.payload};
//         default:
//             return state;
//     }
// }

//BELOW IS THE SAMPLE REDUCER.JS FILE FROM CHANNEL MODULE
// const initReducer = () => {
//     const INITIAL_STATE = {
//         list: [],
//     };
//     const reducer = (state = INITIAL_STATE, action) => {
        

//         switch (type) {
//             case types.FETCH_CHANNELS_SUCCESS:
//                 return {
//                     ...state,
//                     list: payload,
//                 };                                
//             default: 
//                 return state;
//         }};
//     return reducer;
// };
// export default initReducer;