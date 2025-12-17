import React from 'react'

export default function Register() {
  return (
    <div class="flex justify-center mt-15">
        <form class="bg-white shadow px-8 pt-6 pb-8 mb-4 w-full max-w-sm border border-gray-300 rounded-xl">
            <h1 className='text-2xl font-bold text-indigo-500 mb-3 text-center'>Register</h1>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input class="appearance-none text-gray-600 border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-indigo-500 italic" id="email" type="email" placeholder="yourname@example.com"/>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="appearance-none text-gray-600 border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-indigo-500 italic" id="password" type="password" placeholder="Password"/>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer" type="button">
                    Register
                </button>
            </div>
        </form>
    </div>
  )
}
