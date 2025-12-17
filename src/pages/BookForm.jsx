import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme.js';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import useFirestore from '../hooks/useFirestore.js';

export default function Create() {
  let { id } = useParams();
  let [title, setTitle] = useState('');
  let [cover, setCover] = useState('');
  let [categories, setCategories] = useState([]);
  let [newCategory, setNewCategory] = useState('');
  let [description, setDescription] = useState('');
  let [isEdit, setIsEdit] = useState(false);

  let { updateDocument, addCollection } = useFirestore();
  
  useEffect(() => {
    if (id) {
      // edit form
      setIsEdit(true);
      let ref = doc(db, 'books', id);
      getDoc(ref).then(doc => {
        if (doc.exists()) {
          let {title, description, categories, cover} = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
          setCover(cover);
        }
      });
    }
    else {
      // create form
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
      setCover('');
    }
  }, [id]);

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
  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      cover,
      date: serverTimestamp()
    }
    if (isEdit) {
      await updateDocument('books', id, data);
    }
    else {
      await addCollection('books', data);
    }

    navigate('/');
  }

  return (
  <div className='h-screen'>
    <p className={`inline-block align-baseline font-bold mb-2 text-lg ${isDark ? 'text-indigo-400' : 'text-pink-400' }`}>
      Create New Book
    </p>
    <form className={`bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-300 ${isDark ? 'bg-zinc-900 text-gray-200 border-indigo-400 shadow-none' : '' }`} method='POST' onSubmit={handleSubmit} >
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
          />
          <button onClick={addCategory} className={`${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-pink-400 hover:bg-pink-500' } text-white p-2 rounded-full cursor-pointer`} type='button'>
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
      <div className="flex items-center justify-between">
        <button type="submit" className={`${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-pink-400 hover:bg-pink-500' } text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline cursor-pointer`}>
          {isEdit ? 'Update Book' : 'Save Book'}
        </button>
      </div>
    </form>
  </div>
  )
}
