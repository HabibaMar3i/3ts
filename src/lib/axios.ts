import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://moisten-pebble-superhero.ngrok-free.dev/api/',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
  },
})