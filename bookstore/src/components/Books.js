import React, { useState } from "react";
import { getAllbooks } from "../api/auth";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const data = await getAllbooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={fetchBooks}
      >
        Get All Books
      </button>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-2">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-500">Price: ${book.price}</p>
              <p className="text-gray-500">image: ${book.image}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
