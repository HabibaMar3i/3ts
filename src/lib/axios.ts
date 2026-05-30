import axios from 'axios'
import i18n from '../i18n'

export const axiosInstance = axios.create({
  baseURL: 'https://moisten-pebble-superhero.ngrok-free.dev/api/',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers['lang'] = i18n.language || 'ar'
  
  const auth = JSON.parse(localStorage.getItem('auth-storage') || '{}')
  const token = auth?.state?.token
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  
  return config
})