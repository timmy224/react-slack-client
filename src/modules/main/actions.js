import { actions } from "../../context";

const initActions = function() {
    const initMain = () => async (dispatch) => {
        await dispatch(actions.sidebar.initSidebar());
        await dispatch(actions.chat.initChat());
    };

    return { initMain };
};

export default initActions;