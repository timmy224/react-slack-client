import types from "./types";
<<<<<<< HEAD

 const initActions = function() {
	const changeRoute = (route) => (dispatch) => {
                   dispatch({type: types.CHANGE_ROUTE, 
                   			payload:route});
=======
import { actionCreator } from "../utils";

 const initActions = function() {
 	const routeChange = actionCreator(types.CHANGE_ROUTE)
	const changeRoute = (route) => (dispatch) => {
                   dispatch(routeChange(route));
>>>>>>> dev
	};

	return { changeRoute };
		
	};

export default initActions;

<<<<<<< HEAD

// export const setSearchField = (text) =>({
// 	type : CHANGE_SEARCHFIELD,
// 	payload : text
// })
// const mapDispatchToProps = (dispatch)=>{
// 	return{
// 		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),

// const setSearchField = (dispatch) => (event) =>{
// 		dispatch({type:CHANGE_SEARCHFIELD,
// 					payload:event.target.value})
// }
=======
>>>>>>> dev
