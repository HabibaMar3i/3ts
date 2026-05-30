import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://moisten-pebble-superhero.ngrok-free.dev/api/',
})