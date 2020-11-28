import { config } from "../Config";

const OrgService = function (apiService) {
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
            .then(data => JSON.parse(data.orgs));
    }

    const fetchOrg = orgName => {
        const url = `${config.API_URL}/org`;

        const data = {
            action: "GET",
            org_name: orgName
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => JSON.parse(data.org));
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
        fetchOrg,
        deleteOrg,
    });
};

export default OrgService;