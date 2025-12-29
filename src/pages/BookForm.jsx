import { useContext, useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme.js';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import useFirestore from '../hooks/useFirestore.js';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Create() {
  let { id } = useParams();
  let [title, setTitle] = useState('');
  let [cover, setCover] = useState('');
  let [categories, setCategories] = useState([]);
  let [newCategory, setNewCategory] = useState('');
  let [description, setDescription] = useState('');
  let [categoryError, setCategoryError] = useState('');
  let [saving, setSaving] = useState(false)
  let navigate = useNavigate();
  let { isDark } = useTheme();

  const isEdit = Boolean(id);

  let { updateDocument, addCollection } = useFirestore();
  
  useEffect(() => {
    if (!isEdit) {
      return;
    }
    
    const ref = doc(db, 'books', id);
    getDoc(ref).then(doc => {
      if (doc.exists()) {
        let {title, description, categories, cover} = doc.data();
        setTitle(title);
        setDescription(description);
        setCategories(categories);
        setCover(cover);
      }
    });
  }, [id, isEdit]);

  let addCategory = (e) => {
    e.preventDefault();
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory('');
      return;
    }
    else if (newCategory == '') {
      setCategoryError('Please enter one or more genre.')
      return;
    }
    setCategories(prev => [newCategory, ...prev]);
    setNewCategory('');
    setCategoryError('');
  }

  let { user } = useContext(AuthContext);
  console.log(user);
  // add Book
  let handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let data = {
      title,
      description,
      categories,
      cover,
      uid: user.uid
    }
    if (categories == '') {
      setCategoryError('Please enter one or more genre.');
      setSaving(false);
      return;
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
      {isEdit ? 'Update' : 'Create New'} Book
    </p>
    <form className={`bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-300 ${isDark ? 'bg-zinc-900 text-gray-200 border-indigo-400 shadow-none' : '' }`} method='POST' onSubmit={handleSubmit} >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title"> Book Title </label>
        <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`} 
          name="title"
          id="title" 
          type="text"
          placeholder="My Book Title"
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
          placeholder='Book description...'
          required
          > 
        </textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="categories"> Genre </label>
        <div className='flex items-center gap-2'>
          <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`} 
            name="categories"
            type="text"
            id="categories"
            placeholder="What's your book's genre?"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button onClick={addCategory} className={`${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-pink-400 hover:bg-pink-500' } text-white p-2 rounded-full cursor-pointer`} type='button'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
        { categoryError && <p className='text-red-500 italic text-sm'> {categoryError} </p> }
        {categories.map((genre) => (
          <span className='inline-flex mt-2 items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-500 me-1 text-white' key={genre}>
            {genre}
          </span>
        ))}
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-2" htmlFor="imageurl">
          Cover URL
        </label>
        <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500`}
          name="imageurl"
          id="imageurl" 
          type="text" 
          placeholder="Leave blank for defalut cover"
          value={cover}  
          onChange={e => setCover(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button disabled={saving} type="submit" className={`${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-pink-400 hover:bg-pink-500' } flex items-center text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline cursor-pointer`}>
          {saving && (
            <svg className="mr-2 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          )}
          {saving ? isEdit ? 'Updating...' : 'Saving...' : isEdit ? 'Update book' : 'Save book'}
        </button>
      </div>
    </form>
  </div>
  )
}
