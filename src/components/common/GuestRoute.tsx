import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export default function GuestRoute() {
    const token = useAuthStore((s) => s.token)
    if (token) return <Navigate to="/" replace />
    return <Outlet />
}