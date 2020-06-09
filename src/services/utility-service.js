/*
    UtilityService is a place to put useful helper methods that can be used throughout the entire app
*/
const UtilityService = function() {
    const isEmpty = obj => {
        for (var x in obj) { return false; }
        return true;
    }

    const getFirstProp = obj => Object.values(obj)[0];

    return Object.freeze({
        isEmpty,
        getFirstProp,
    });
};

export default UtilityService;