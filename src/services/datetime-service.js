const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const FORMAT = "YYYY/MM/DD HH:mm:ss:SSS";

function dateTimeService() {
    const dt = (dtString, format = FORMAT) => dayjs(dtString, format);

    const getDtStr = (format = FORMAT) => dayjs().format(format);

    return Object.freeze({
        dt,
        getDtStr
    });
}

export default dateTimeService;