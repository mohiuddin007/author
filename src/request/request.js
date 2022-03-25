import axios from "axios";
import axiosRetry from "axios-retry";
const cookie = require("cookie");

const url = process.env.REACT_APP_API_ENDPOINT;

/**
 *
 * @param {string} link
 * @param {object} params
 * @param {object} header
 */

const request = async (link, params, header = null) => {
   
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer ",
    };

    const cookies = cookie.parse(document.cookie);
    if (cookies.token) {
        headers.Authorization += cookies.token;
    }

    const ax = axios.create({
        baseURL: url,
        headers,
    });

    axiosRetry(ax, {
        retries: 3,
        retryDelay: (retryCount) => {
            return retryCount * 1000;
        },
    });

    const confiq = {
        method: (params && params.method) || "GET",
        url: link,
        data: (params && params.data) || "",
        "axios-retry": {
            retries: 2,
        },
    };

    if (params && params.method && params.method === "GET") {
        if (params.data) confiq.params = params.data || "";
        delete confiq.data;
    }

    if (header) confiq.headers = header;

    return await ax(confiq)
        .then((res) => {
            return {
                status: res.status,
                data: res.data,
                headers: res.headers,
            };
        })
        .catch((error) => { 
            // Error 😨
            if (error.response) {
                const { data, config, status } = error.response;
                const throwError = {
                    message: data.message || "Internal Server Error",
                    status: status || 500,
                };

                if (error && error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    // toast(data.message);
                    console.log(
                        "req error ===========response 1",
                        data,
                        config.url,
                        status
                    );
                } else if (error && error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                    */
                    console.log("error.request========= 2 ", error.request);
                    throwError.message = error.request;
                    throwError.status = 500;
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log("Error========== 3", error);
                    throwError.message = error.message || error;
                    throwError.status = status || error.status || 500;
                }
                throw throwError;
                // return throwError;
            } else if (error.request) {
                console.log("Could not connect to the server");
                throw {
                    message: "Couldn't connect to the server",
                    status: 504,
                }
            } else {
                throw {
                    message: "Something went wrong",
                    status: 404,
                }
            }
        });

};


axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default request;
