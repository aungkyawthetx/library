import React, { useState } from 'react'

export default function Create() {

  let [title, setTitle] = useState('');
  let [description, setDescription ] = useState('');
  let [newCategory, setNewCategory] = useState('');
  let [imageUrl, setImageUrl] = useState('');
  let [categories, setCategories] = useState([]);

  const addCategory = (e) => {
    e.preventDefault();
    setCategories(prev => [newCategory, ...prev]);
    setNewCategory('');
  }

  return (
  <div>
    <p className="inline-block align-baseline font-bold text-pink-500 mb-2 text-lg">
      Create New Book
    </p>
    <form className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-300">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title"> Book Title </label>
        <input className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500" 
          name="title"
          id="title" 
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description"> Description </label>
        <textarea className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500" 
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          > 
        </textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories"> Categories </label>
        <div className='flex items-center gap-2'>
          <input className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500" 
            name="categories"
            type="text"
            id="categories"
            placeholder="What's the book's genre?"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button onClick={addCategory} className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer' type='button'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
        {categories.map((genre) => (
          <span className='inline-flex mt-2 items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-500 me-1 text-white' key={genre}>
            {genre}
          </span>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageurl">
          Image URL
        </label>
        <input className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500" 
          name="imageurl"
          id="imageurl" 
          type="text" 
          placeholder="https://exampla.com/image.png"
          value={imageUrl}  
          onChange={e => setImageUrl(e.target.value)}
          />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer" type="button">
          Save Book
        </button>
      </div>
    </form>
  </div>
  )
}
