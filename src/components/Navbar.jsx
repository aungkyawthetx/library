import Profile from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.svg';
import useSignout from '../hooks/useSignout';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
    let { changeTheme, isDark } = useTheme();
    let navigate = useNavigate();
    let { user } = useContext(AuthContext);

    let { logOut } = useSignout();

    let sighOutuser = async () => {
        await logOut();
        navigate('/login');
    }

    return (
        <nav className={`border-b border-gray-300 ${isDark ? 'bg-zinc-900 text-white border-indigo-400' : '' }`}>
            <ul className='flex justify-between items-center backdrop-blur-lg p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input type="text" placeholder='Search books' className={`outline-none border border-gray-300 px-3 py-1 rounded focus:border-indigo-400 ${isDark ? 'placeholder:text-white' : ''}`} />
                </li>
                <Link to='/' className='flex items-center gap-2 cursor-pointer md:-ml-32'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    <span className={`text-2xl ${isDark ? 'text-white' :'text-pink-500'} font-bold hidden md:block`}> Book Store </span>
                </Link>
                <li className='flex items-center gap-2'>
                    <Link to="/create" className={`text-white px-3 py-2 rounded-full cursor-pointer flex items-center gap-1 ${isDark ? 'bg-indigo-400 hover:bg-indigo-500' : 'bg-pink-400 hover:bg-pink-500' }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='hidden md:block'> Create </span>
                    </Link>
                    <img src={Profile} alt="" className='cursor-pointer w-10 h-10 rounded-full'/>
                    <div className='cursor-pointer'>
                        {isDark && <img src={lightIcon} alt="" className='w-6' onClick={() => changeTheme('light')}/>}
                        {!isDark && <img src={darkIcon} alt="" className='w-6' onClick={() => changeTheme('dark')}/>}
                    </div>
                    <div className='space-x-3'>
                        {!user &&
                            <>
                                <Link to={`/login`} className='bg-blue-500 text-white rounded-lg px-2 py-2 text-sm cursor-pointer'> Login </Link>
                                <Link to={`/register`} className='bg-indigo-500 text-white rounded-lg px-2 py-2 text-sm cursor-pointer'> Register </Link>
                            </>
                        }
                        {!!user && <button onClick={sighOutuser} className='bg-red-500 text-white rounded-lg px-2 py-2 text-sm cursor-pointer'> Logout </button>}
                    </div>
                </li>
            </ul>
        </nav>
    )
}
