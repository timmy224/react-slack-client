import { SET_USERNAME, TAKEN_USERNAME, CHANGE_ROUTE, ROUTE_TO_ALERT, MESSAGE_RECEIVED } from './constants.js'
// import types from "./types";
// import { actionCreator } from "../utils";


    const initActions = function(chatService) {
		
		const setUsername = (usernameValue) =>({
			type : SET_USERNAME,
			payload : usernameValue
		})
		const routeToAlert = (route) =>({
			type: ROUTE_TO_ALERT,
			payload: route
		})
		const takenUsername = (bool) =>({
			type: TAKEN_USERNAME,
			payload: bool
		})
		const changeRoute = ( route )=>({
			type: CHANGE_ROUTE,
			payload: route
		})
		const messageReceived = ( message) => {
			console.log(message)
			return {
				type: MESSAGE_RECEIVED,
				payload: message
			}
		}


		return { setUsername, routeToAlert, takenUsername, changeRoute, messageReceived };
	}
export default initActions

//BELOW IS MY ATTEMPT USING CHANNELTEST/ACTION.JS AS REFERENCE
	// const messageList = actionCreator(types.MESSAGE_LIST);

	// const setMessageList = () => async (dispatch) => {
	// 	// const message = await chatService.getMessages$().subscribe;
	// 	dispatch(messageList(message));
	// }


//BELOW IS THE ORIGINAL CODE IN CHAT.JS
// services.chatService.getMessages$().subscribe(message => {
//       console.log("Received a message through the observable: ", message);
//       this.setState({
//         messages: [...this.state.messages, message]
//       });


//BELOW IS THE ACTION PROTOTYPE FROM ROBOFRIENDS
// export const setSearchField = (text) =>({
// 	type : CHANGE_SEARCHFIELD,
// 	payload : text
// })

//BELOW IS THE MESSAGES LOGIC
// const { setMessageList } = this.props;
//     services.chatService.getMessages$().subscribe(message => {
//       console.log("Received a message through the observable: ", message);
//       // this.setState({
//       //   messages: [...this.state.messages, message]
//       // });
//       setMessageList(message);
//     });
//   }
// const messageList = actionCreator(types.MESSAGE_LIST)
// const setMessageList = () => asyn (dispatch) => {
// 	const messages = await chatService.getMessages$();
// 	dispatch(messageList(messages))
// }

//BELOW IS THE ACTION.JS FILE PROTOYPE FROM THE CHANNEL MODULE
		
//	const initActions = function (channelService) {
//     const fetchChannelsSuccess = actionCreator(types.FETCH_CHANNELS_SUCCESS);

//     const fetchChannels = () => async (dispatch) => {
//         const channels = await channelService.fetchChannels();
//         dispatch(fetchChannelsSuccess(channels));
//     };

//     return { fetchChannels };
// };

// export default initActions;

