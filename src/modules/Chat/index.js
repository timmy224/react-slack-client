import chatReducer from "./chatReducer";
import messageUpdate from "./chatActions";

const configureChatModule = () => {
  const actions = messageUpdate();
  const reducer = chatReducer();

  return { actions, reducer };
};
export default configureChatModule;
