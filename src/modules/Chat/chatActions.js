import { MESSAGE_UPDATE } from "./chatTypes";
import { services } from "../../context";

export const messageUpdate = (message) => (dispatch) => {
  services.chatService.getMessages$().subscribe((message) => {
    console.log("Received a message through the observable: ", message);

    dispatch({
      type: MESSAGE_UPDATE,
      payload: message,
    });
  });

  return {
    type: MESSAGE_UPDATE,
    message,
  };
};

export default messageUpdate;
