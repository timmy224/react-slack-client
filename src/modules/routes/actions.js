import types from "./types";

 const initActions = function() {
	const changeRoute = (route) => (dispatch) => {
                   dispatch({type: types.CHANGE_ROUTE, 
                   			payload:route});
	};

	return { changeRoute };
		
	};

export default initActions;


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