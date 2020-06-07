import { actions } from "../../context";

const initActions = function() {
    const initSidebar = () => async (dispatch) => {
        await dispatch(actions.channel.fetchChannelIDs());
    }

    return { initSidebar };
}

export default initActions;