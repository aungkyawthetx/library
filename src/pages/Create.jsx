import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';

export default function Create() {
  let [title, setTitle] = useState('');
  let [description, setDescription ] = useState('');
  let [newCategory, setNewCategory] = useState('');
  let [cover, setCover] = useState('');
  let [categories, setCategories] = useState([]);
  let [saving, setSaving] = useState(false);

  let { setPostData, data: book, error} = useFetch('http://localhost:3001/books', 'POST');
  let navigate = useNavigate();
  let { isDark } = useTheme();

  let addCategory = (e) => {
    e.preventDefault();
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory('');
      return;
    }
    setCategories(prev => [newCategory, ...prev]);
    setNewCategory('');
  }

  // add Book
  let addBook = (e) => {
    e.preventDefault();
    let data = {
      title, 
      description,
      categories,
      cover
    }
    setPostData(data);
    setSaving(true);
  }

  useEffect(() => {
    if (book) {
      navigate('/');
    }
  }, [book, navigate])

  return (
  <div className='h-screen'>
    <p className="inline-block align-baseline font-bold text-indigo-500 mb-2 text-lg">
      Create New Book
    </p>
    <form className={`bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-300 ${isDark ? 'bg-zinc-900 text-gray-200 border-indigo-400 shadow-none' : '' }`} method='POST' onSubmit={addBook} >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title"> Book Title </label>
        <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`} 
          name="title"
          id="title" 
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="">
        <label className="block text-sm font-bold mb-2" htmlFor="description"> Description </label>
        <textarea className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`}
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Enter book description'
          required
          > 
        </textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="categories"> Categories </label>
        <div className='flex items-center gap-2'>
          <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`} 
            name="categories"
            type="text"
            id="categories"
            placeholder="What's the book's genre?"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            required
          />
          <button onClick={addCategory} className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer' type='button'>
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
      <div className="mb-3">
        <label className="block text-sm font-bold mb-2" htmlFor="imageurl">
          Image URL
        </label>
        <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`}
          name="imageurl"
          id="imageurl" 
          type="text" 
          placeholder="https://exampla.com/image.png"
          value={cover}  
          onChange={e => setCover(e.target.value)}
          required
        />
      </div>

      {error && <p className='text-red-500 italic mb-2 text-sm'>Something went wrong during book create.</p>}
        
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline cursor-pointer">
          {saving ? 'Saving...' : 'Save Book'}
        </button>
      </div>
    </form>
  </div>
  )
}
