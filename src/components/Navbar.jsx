import React from 'react'
import Profile from '../assets/profile.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
    <nav className='border-b border-gray-300'>
        <ul className='flex justify-between items-center backdrop-blur-lg p-3 max-w-6xl mx-auto'>
            <li className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <input type="text" placeholder='Search books' className='outline-none'/>
            </li>
            <Link to='/' className='flex items-center gap-2 cursor-pointer md:-ml-32'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                <span className="text-2xl text-red-400 font-bold hidden md:block"> Shelfio </span>
            </Link>
            <li className='flex items-center gap-2'>
                <Link to="/create" className='bg-red-300 text-white p-2 md:px-3 md:py-2 rounded-full md:rounded-2xl cursor-pointer flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className='hidden md:block'> Create </span>
                </Link>
                <img src={Profile} alt="" className='cursor-pointer w-10 h-10 rounded-full'/>
            </li>
        </ul>
    </nav>
  )
}
