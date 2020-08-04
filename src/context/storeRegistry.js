// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import createRegistry from "mag-service-registry";

const registry = createRegistry();

export const registerStore = registry.register;

export default registry.exposeRegistered();