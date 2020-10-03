import { config } from "../Config";

const PermissionService = function(apiService) {
    const fetchPermissions = (username) => {
        const url = `${config.API_URL}/permission/?username=${username}`;
        return apiService.go(url)
            .then(response => response.json())
    };

    return Object.freeze({
        fetchPermissions
    });
};

export default PermissionService;