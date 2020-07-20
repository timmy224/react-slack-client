function DemoService() {
    // COOKIES DEMO // 
    const getCookie = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/get-cookie";
        let localUrl = "http://localhost:5000/get-cookie";
        return fetch(localUrl, {credentials: "include"})
            .then(response => response.json());
    };

    const sendCookie = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/send-cookie";
        let localUrl = "http://localhost:5000/send-cookie";
        return fetch(localUrl, {credentials: "include"})
            .then(response => response.json());
    }
    return Object.freeze({
        getCookie, 
        sendCookie,
    });
}

export default DemoService;