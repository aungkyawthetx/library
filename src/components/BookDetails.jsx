import { useParams } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import { useDocument } from '../hooks/useDocument';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

export default function BookDetails() {
  let { id } = useParams();
  let { error, loading, data: book } = useDocument('books', id);
  let { isDark } = useTheme();
  const classes = {
    "Romance": "bg-pink-100 text-pink-700",
    "History": "bg-yellow-100 text-yellow-700",
    "Sci-Fi": "bg-indigo-100 text-indigo-700",
    "Fantasy": "bg-green-100 text-green-700",
    "Biography": "bg-blue-100 text-blue-700",
    "Thriller": "bg-red-100 text-red-700",
    "Classic": "bg-fuchsia-200 text-fuchsia-700",
  };

  return (
    <>
      {error && <p className='text-red-500 fw-semibold'> { error } </p>}
      {loading && <p className='text-indigo-500 fw-semibold'>Loading... </p>}
      {book && (
      <> 
        <div className={`max-w-6xl mx-auto p-4 ${isDark ? 'text-white' : ''}`}>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-md p-6 border border-gray-200 ${isDark ? 'bg-zinc-900 border-indigo-300 shadow-none' : ''}`}>
            <div className="flex justify-center">
              <img
                src={book.cover ? book.cover : 'https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg'}
                alt="Book Cover"
                className="w-full rounded-xl shadow-md object-cover"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <h1 className={`text-3xl font-bold text-gray-700 uppercase ${isDark ? 'text-indigo-400' : ''}`}> {book.title} </h1>
                <div className='flex gap-2'>
                  {book.categories.map((genre) => (
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes[genre] || 'bg-indigo-200 text-indigo-700'}`} key={genre}>
                      {genre}
                    </span>
                  ))}
                </div>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {book.description}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={`${isDark ? 'text-indigo-500' : 'text-pink-500'} text-xl font-bold my-3`}>My Notes </h3>
          <NoteForm/>
          <NoteList/>
        </div>
      </>
      )}
    </>
  )
}
