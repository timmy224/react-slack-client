import { config } from "../Config";

function DemoService() {
    // COOKIES DEMO // 
    const getCookie = () => {
        const url = `${config.API_URL}/get-cookie`;
        return fetch(url, {credentials: "include"})
            .then(response => response.json());
    };

    const sendCookie = () => {
        const url = `${config.API_URL}/send-cookie`;
        return fetch(url, {credentials: "include"})
            .then(response => response.json());
    }
    return Object.freeze({
        getCookie, 
        sendCookie,
    });
}

export default DemoService;