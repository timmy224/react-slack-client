const InvitationService = function (apiService) {
    const fetchOrgs = () => {
        const url = `${config.API_URL}/org`;

        const post_data = {
            action: "GET"
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
            .then(data=>data.orgs)
    }
    const createOrg = (org_info) => {
        const url = `${config.API_URL}/org`;

        const options = {
            method: "POST",
            body: JSON.stringify(org_info),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
    };

    const deleteOrg = org_id => {
        const url = `${config.API_URL}/org`;
        
        const options = {
            method: "DELETE",
            body: JSON.stringify(org_id),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => data.successful)
    };

    return Object.freeze({
        createOrg,
        fetchOrgs,
        deleteOrg,
    });
};

export default InvitationService;