import React from 'react'

export default function Hero() {
    return (
    <div className="bg-linear-to-r from-indigo-200 via-red-200 to-yellow-100 h-48 flex justify-center items-center">
        <div className="space-y-2 text-center">
            <h1 className="text-white text-3xl font-semibold uppercase"> Welcome from BookS. 📚</h1>
            <p className="text-gray-50 italic"> "A place where you can save your books online" </p>
        </div>
    </div>
    )
}
