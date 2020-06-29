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
        return fetch(url, addDefaultOptions(options));
    }

    return Object.freeze({
        go,
    });
}

export default ApiService;
