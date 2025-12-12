import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <nav className='shadow p-4 px-5 font-semibold flex justify-between items-center backdrop-blur-lg'>
                <p className='text-blue-500'>Vite + React</p>
                <ul className='flex gap-5'>
                    <li> Home </li>
                    <li> Create</li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}
