import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx';

export default function Layout() {
    return (
        <div>
            <Navbar/>
            <div className='max-w-6xl mx-auto p-3'>
                <Outlet/>
            </div>
        </div>
    )
}
