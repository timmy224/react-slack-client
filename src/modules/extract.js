const ACTIONS_KEY = "actions";
const REDUCER_KEY = "reducer";

const extract = (modules, key) => {
    return Object.entries(modules)
        /* Object.entries() returns all of the enumerable properties on an object as an array. We 
        want to isolate only the module properties and ignore all the other properties on an object. */
        .filter(entry => {
            // Each entry in entries is an array: [propertyName, propertyValue]
            let propertyValue = entry[1];
            /* If propertyValue has the key property, this is one of the entries we want to
            keep because it's a module */
            let isModuleEntry = !!propertyValue[key];
            return isModuleEntry;
        })
        .map(entry => {
            /* Now we want to transform from array to object 
            [moduleName, module] --> { moduleName: module[key] } */
            [moduleName, module] = entry;
            return { [moduleName]: module[key] };
        })
        .reduce((output, entry) => {
            /* Now we want to transform our array of objects into a single object having
            the form { moduleX: moduleXActions, moduleY: moduleYActions, ... } */
            return ({ ...output, ...entry });
        }, {});
}

export const extractActions = modules => extract(modules, ACTIONS_KEY);
export const extractReducers = modules => extract(modules, REDUCER_KEY);
