import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function Register() {

    let { error, loading, signUp } = useSignup();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        let user = await signUp(email, password);
        if (user) {
            navigate('/');
        }
    }

    return (
        <div className="flex justify-center mt-15">
            <form onSubmit={registerUser} className="bg-white shadow px-8 pt-6 pb-8 mb-4 w-full max-w-sm border border-gray-300 rounded-xl">
                <h1 className='text-2xl font-bold text-indigo-500 mb-3 text-center'>Register</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="appearance-none text-gray-600 border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-indigo-500 italic" id="email" type="email" placeholder="yourname@example.com"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="appearance-none text-gray-600 border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-indigo-500 italic" id="password" type="password" placeholder="Password"/>
                    {error && <p className="text-red-500 text-xs italic"> {error} </p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="flex items-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer" type="submit">
                        {loading && <svg className="mr-2 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
