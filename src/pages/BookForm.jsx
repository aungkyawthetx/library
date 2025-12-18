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
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState('');
  let [categories, setCategories] = useState([]);
  let [newCategory, setNewCategory] = useState('');
  let [description, setDescription] = useState('');
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
        let {title, description, categories} = doc.data();
        setTitle(title);
        setDescription(description);
        setCategories(categories);
      }
    });
  }, [id, isEdit]);

  let addCategory = (e) => {
    e.preventDefault();
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory('');
      return;
    }
    setCategories(prev => [newCategory, ...prev]);
    setNewCategory('');
  }

  let { user } = useContext(AuthContext);
  console.log(user);
  // add Book
  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      uid: user.uid
    }
    if (isEdit) {
      await updateDocument('books', id, data);
    }
    else {
      await addCollection('books', data);
    }
    navigate('/');
  }

  let handleChangedImage = (e) => {
    setFile(e.target.files[0]);
  }

  let handlePreviewImage = (file) => {
    let reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    }
  }

  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file])

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
          Cover Image
        </label>
        <input className={`${isDark ? 'placeholder:text-gray-400' : ''} border border-gray-300 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer`}
          name="imageurl"
          id="imageurl" 
          type="file"
          onChange={handleChangedImage}
          required
        />
        {preview && <img src={preview} className='h-25 mt-2 rounded' alt="Preview Image" />}
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
