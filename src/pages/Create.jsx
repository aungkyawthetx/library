import React from 'react'

export default function Create() {
  return (
    <div>
      <p class="inline-block align-baseline font-bold text-pink-500 mb-4 text-lg">
        Create New Book
      </p>
      <form class="bg-white shadow rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-200">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Book Title
          </label>
          <input class="appearance-none border border-gray-200 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="title" type="text" placeholder="Enter book title"/>
        </div>
        <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Description
          </label>
          <textarea class="appearance-none border border-gray-200 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="description"> </textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Genre
          </label>
          <input class="appearance-none border border-gray-200 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="title" type="text" placeholder="What's the book's genre?"/>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="button">
            Save Book
          </button>
        </div>
      </form>
    </div>
  )
}
