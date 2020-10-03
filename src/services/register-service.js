import { config } from "../Config";

const RegisterService = function(apiService) {
    const registerUser = (username, password) => {
        const url = `${config.API_URL}/register`;
        const post_data = {
            "username": username,
            "password": password
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
    }
    return Object.freeze({
        registerUser
    })
    
};
export default RegisterService;