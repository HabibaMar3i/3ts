import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://your-api.com',
})