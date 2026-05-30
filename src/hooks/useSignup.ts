import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { signupApi, type SignupResponse } from '../api/auth.api'
import { getCitiesApi } from '../api/cities.api'
import type { SignupFormValues } from '../schemas/auth.schema'

type SignupError = AxiosError<{ message?: string; errors?: Record<string, string[]> }>

export const useSignup = () => {
    const [serverError, setServerError] = useState('')
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
    const [geoError, setGeoError] = useState('')

    const { data: cities = [], isLoading: citiesLoading } = useQuery({
        queryKey: ['cities'],
        queryFn: getCitiesApi,
    })

    const getLocation = () => {
        if (!navigator.geolocation) {
            setGeoError('Geolocation not supported')
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                setGeoError('')
            },
            () => setGeoError('Could not get location. Please try again.')
        )
    }

    const { mutate, isPending, isSuccess } = useMutation<SignupResponse, SignupError, SignupFormValues & { lat: number; lng: number; lang: string }>({
        mutationFn: signupApi,
        onSuccess: (_data: SignupResponse) => {
            setServerError('')
            toast.success('Signed up successfully')
        },
        onError: (error: SignupError) => {
            const msg =
                error.response?.data?.message ||
                'Something went wrong. Please try again.'
            setServerError(msg)
            toast.error(msg)
        },
    })

    const signup = (payload: SignupFormValues & { lat: number; lng: number; lang: string }) => {
        if (!coords) {
            setGeoError('Please get your location first')
            return
        }
        setServerError('')
        mutate({ ...payload, lat: coords.lat, lng: coords.lng })
    }

    return { signup, isPending, isSuccess, serverError, cities, citiesLoading, coords, geoError, getLocation }
}