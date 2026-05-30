import { axiosInstance } from '../lib/axios'

export interface City {
  id: number
  name: string
}

export const getCitiesApi = async (): Promise<City[]> => {
  const { data } = await axiosInstance.get('/cities')
  console.log('cities response:', data)
  return data.data ?? []
}