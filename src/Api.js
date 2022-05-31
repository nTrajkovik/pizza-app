import axios from 'axios';
console.log(process.env);
const Api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_API,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
export default Api;

