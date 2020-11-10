import { constants } from "./Constants";

const prod = {
    API_URL: constants.prod.API_URL
}

const dev = {
    API_URL: constants.dev.API_URL
}

export const config = process.env.NODE_ENV === "production" ? prod : dev;