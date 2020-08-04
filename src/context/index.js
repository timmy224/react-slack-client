// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import actions, { registerActions } from "./actionRegistry";
import services, { registerServices }from "./serviceRegistry";
import store, { registerStore }from "./storeRegistry";

export {
    actions,
    services,
    store
};

export default {
    actions,
    registerActions,
    services,
    registerServices,
    store,
    registerStore
};

