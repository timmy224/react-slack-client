import { config } from "../Config";

const PermissionService = function(apiService) {
    const fetchPermissions = () => {
        const url = `${config.API_URL}/permission`;

        const data = {}

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return apiService.go(url, options)
            .then(response => response.json())
    };

    return Object.freeze({
        fetchPermissions
    });
};

export default PermissionService;