import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { logoutApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

export const useLogout = () => {
    const { clearAuth } = useAuthStore()
    const navigate = useNavigate()

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            clearAuth()
            toast.success('Logged out successfully')
            navigate('/login')
        },
        onError: () => {
            // clear locally even if API fails
            clearAuth()
            toast.error('Could not log out, you have been signed out locally')
            navigate('/login')
        },
    })

    return { logout, isPending }
}