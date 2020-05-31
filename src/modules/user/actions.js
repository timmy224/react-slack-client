import { SET_USERNAME, TAKEN_USERNAME, MESSAGE_RECEIVED } from './constants.js'

    const initActions = function() {
		
		const setUsername = (usernameValue) =>({
			type : SET_USERNAME,
			payload : usernameValue
		})
		const takenUsername = (bool) =>({
			type: TAKEN_USERNAME,
			payload: bool
		})
		const messageReceived = ( message) => {
			console.log(message)
			return {
				type: MESSAGE_RECEIVED,
				payload: message
			}
		}


		return { setUsername, takenUsername, messageReceived };
	}
export default initActions



