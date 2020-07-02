// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import actions, { registerActions } from "./actionRegistry";
import services, { registerServices }from "./serviceRegistry";
import dispatch, { registerDispatch }from "./dispatchRegistry";

export {
    actions,
    services,
    dispatch
};

export default {
    actions,
    registerActions,
    services,
    registerServices,
    dispatch,
    registerDispatch
};

