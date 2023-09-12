const { default: axios } = require("axios");
const { EA_IAM_URL, API_CONFIG } = require("../common/constant/api-constants");
const getToken = require("../middleware/getToken");

const getUser = async ( token ) => {
    axios.defaults.headers.common["x-auth-token"] = token;
    const response = await axios.get(
        `${EA_IAM_URL}/get-user`, API_CONFIG);
    if (response.data) {
        return { status: true, data: response.data };
    } else {
        return { status: false, data: {} }
    }
}

const getUsers = async () => {
    const token = await getToken({ _id: "System Token"});
    axios.defaults.headers.common["x-auth-token"] = token;
    const response = await axios.get(
        `${EA_IAM_URL}/users`, API_CONFIG);
    if (response.data) {
        return { status: true, data: response.data };
    } else {
        return { status: false, data: {} }
    }
}

module.exports = { getUser, getUsers };