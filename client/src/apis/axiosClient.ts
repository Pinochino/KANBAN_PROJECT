import axios from 'axios';
import queryString from 'query-string';

const baseUrl = process.env.REACT_APP_BASE || `http://localhost:8000`;
const axiosClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config: any) {
        // Do something before request is sent
        config.headers = {
            Authorization: '',
            Accept: 'application/json',
            ...config.headers,
        };
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.data && response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return Promise.reject({
                message: response.data?.message || 'Unknown error occurred',
                code: response.status,
                details: response.data,  // Optional: additional details from response
            });
        }
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
           // If status code is not in the range of 2xx
           const { response } = error;
           const errorMessage = response?.data?.message || 'Something went wrong';
           const errorCode = response?.status || 500;
   
           // Log detailed error for debugging
           console.error('Login error:', {
               message: errorMessage,
               code: errorCode,
               details: response?.data,  // Optional: additional details
           });
   
           return Promise.reject({
               message: errorMessage,
               code: errorCode,
               details: response?.data,  // Optional: additional details from response
           });
    },
);

export default axiosClient;
