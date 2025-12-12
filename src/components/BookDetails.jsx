import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

export default function BookDetails() {
  let { id } = useParams();
  let { data : book, loading, error } = useFetch(`http://localhost:3001/books/${id}`);

  const classes = {
    "Romance": "bg-pink-100 text-pink-700",
    "History": "bg-yellow-100 text-yellow-700",
    "Sci-Fi": "bg-indigo-100 text-indigo-700",
    "Fantasy": "bg-green-100 text-green-700",
    "Biography": "bg-blue-100 text-blue-700",
    "Thriller": "bg-red-100 text-red-700",
    "Classic": "bg-gray-200 text-gray-700",
  };

  return (
    <>
      {error && <p className='text-red-500 fw-semibold'> {error.message} </p>}
      {loading && <p className='text-indigo-500 fw-semibold'>Loading... </p>}
      {book && (
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-center">
            <img
              src={book.cover}
              alt="Book Cover"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800"> {book.title} </h1>
            {book.categories.map((genre) => (
              <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes[genre] || 'bg-gray-100 text-gray-600'}`} key={genre}>
                  {genre}
              </span>
            ))}
            <p className="text-gray-600 leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
