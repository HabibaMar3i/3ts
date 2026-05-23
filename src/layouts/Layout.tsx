import { Outlet, useLocation } from 'react-router-dom'
import Footer from "#components/common/Footer"
import Navbar from "#components/common/Navbar"
import { useEffect } from 'react';

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [location.pathname]);
    
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