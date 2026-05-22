import { Outlet } from 'react-router-dom'
import Footer from "#components/common/Footer"
import Navbar from "#components/common/Navbar"

export default function Layout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}