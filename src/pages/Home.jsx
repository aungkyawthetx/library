import Hero from "../components/Hero"
import BookCover from "../assets/bookcover.png";

function Home() {
  return (
    <>
      <Hero />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
        {[1, 2, 3, 4].map((key) => (
          <div className="p-4 border border-gray-300 rounded-xl" key={key}>
            <img src={BookCover} alt="" className="h-45 md:h-70 w-full"/>
            <div className="text-center space-y-2 mt-3">
              <h1>Book Title</h1>
              <p> Description </p>
              <div className="flex flex-wrap">
                {['romance', 'history', 'knowledge'].map((genre) => (
                  <span className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-400" key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
  
}

export default Home