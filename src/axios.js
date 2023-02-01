import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.request.use(config => {
    //on averey rquest we make it is going to pass the authorization token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    //axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.user.token}` 
    return config;
})

export default axiosClient;