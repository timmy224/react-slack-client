import { actions } from "../../context";

const initActions = function() {
    const initMain = () => async (dispatch) => {
        await dispatch(actions.sidebar.initSidebar());
        dispatch(actions.chat.initChat());
    };

    return { initMain };
};

export default initActions;