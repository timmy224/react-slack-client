import { config } from "../Config"; 

function ReadStatusService(dateTimeService) {
    const fetchReadStatuses = () => {
        const url = `${config.API_URL}/status/read`;
    
        return apiService.go(url)
            .then(response => response.json())
            .then(data => JSON.parse(data.read_statuses))
    }

    const prepareReadStatus = (type, orgName, destination, readDt) => {
        const readStatus = {
            type,
            org_name: orgName, 
            read_dt: readDt
        };
        if (type == "channel") {
            readStatus["channel_name"] = destination;
        }
        else if (type == "private") { 
            readStatus["receiver_name"] = destination;
        }
        return readStatus;
    } 
    
    return Object.freeze({
        fetchReadStatuses,
        prepareReadStatus
    })
};
export default ReadStatusService;
/*
    readStatuses = {
        "channel_statuses": [
            {
                "channel_name": string,
                "readDateTime": datetime,
            }
        ],
        "private_statuses": [
            {
                "private_name": string,
                "readDateTime": datetime,
            }
        ],
    }
*/