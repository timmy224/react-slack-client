import { config } from "../Config";

const AuthService = function (apiService) {
    const getCSRFToken = () => {
        const url = `${config.API_URL}/auth/csrf`;
        return apiService.go(url);
    }

    const loginUser = (username, password) => {
        const url = `${config.API_URL}/auth/login`;

        const post_data = {
            "username": username,
            "password": password
        }
        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
        }}
        return apiService.go(url, options)
            .then(response => response.json())     
    }

    const loginWithGoogle = () => {
        const url = `${config.API_URL}/auth/login-google`;

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
        }}
        return apiService.go(url, options)
            .then(response => response.json())
            .then(console.log())
    }
    
    return Object.freeze({
        getCSRFToken,
        loginUser,
        loginWithGoogle,
    });
};

export default AuthService; 





