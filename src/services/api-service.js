import { actions, store } from "../context";

function ApiService(storageService) {
    const addDefaultOptions = options => {
        options = { ...options };
        options.credentials = "include";
        addCSRFToken(options);
        return options;
    };

    const addCSRFToken = options =>  {
        const csrf_token = storageService.get("csrf-token");
        if (csrf_token) {
            options.headers = {
                ...options.headers,
                "X-CSRFToken": csrf_token
            };
        }
    };

    const go = (url, options) => {
        return fetch(url, addDefaultOptions(options))
                    .then(checkForHTTPError)
                    .catch(handleHTTPError);
        // return new Promise((resolve, reject) => {
        //     return fetch(url, addDefaultOptions(options))
        //             .then(response => checkForHTTPError(response, resolve))
        //             .catch(err => handleHTTPError(err, reject));
        // });
    };

    const checkForHTTPError = response => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    };

    const handleHTTPError = err => {
        console.log("handling error:", err.message);
        const invalidSessionCookie = err.message === "403";
        const invalidCSRFToken = err.message === "400";
        if (invalidSessionCookie || invalidCSRFToken) {
            store.dispatch(actions.user.logout(false));
        }
        /* We throw an error on the next line because in our special case we have multiple .then()'s following
        this .catch() error handler. Ex: subsequent .then()'s in a service method that returns a http promise
        from this api-service, followed by more .then()'s in the component that calls that service method.

        This is an uncommon because typically catch() is last in the promise chain and not in the middle. If 
        we simply return err here or nothing at all, execution will continue to the next .then(...) following
        this .catch() error handler. By throwing an error, execution jumps to the next .catch() error handler
        and we skip all of the .then()'s in between this .catch() error handler and the next .catch() error
        handler in the chain 
        */
        throw Error(err.message);
    };

    return Object.freeze({
        go,
    });
}

export default ApiService;
