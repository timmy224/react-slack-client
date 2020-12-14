const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function dateTimeService() {
    const now = () => dayjs();

    const dt = (dtString, format) => dayjs(dtString, format);

    const str = (dateTime, format) => {
        return dateTime.format(format);
    }

    return Object.freeze({
        now,
        dt,        
        str,
    });
}

export default dateTimeService;