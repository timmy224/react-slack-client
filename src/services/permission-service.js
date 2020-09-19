const PermissionService = function(apiService) {
    const fetchPermissions = (username) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/permission/?username=${username}`;
        let localUrl = `http://localhost:5000/permission/?username=${username}`;

        return apiService.go(localUrl)
            .then(response => response.json())
    };

    return Object.freeze({
        fetchPermissions
    });
};

export default PermissionService;