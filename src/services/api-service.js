function ApiService(storageService) {
    const addDefaultOptions = options => {
        options = { ...options };
        addCSRFToken(options);
        return options;
    };

    const addCSRFToken = options =>  {
        const csrf_token = storageService.get("csrf_token");
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
