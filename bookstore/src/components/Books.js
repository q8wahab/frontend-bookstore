import React, { useState } from "react";
import { getAllbooks } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  // const [isLoading, setisLoading] = useState(false);

  const { data: booksData, isLoading } = useQuery({
    queryKey: ["getallbooks"],
    queryFn: getAllbooks,
  });

  // const fetchBooks = async () => {
  //   try {
  //     const data = await getAllbooks();
  //     setBooks(data);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };
  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Get All Books
      </button>
      <ul>
        {booksData?.map((book) => (
          <li key={book._id} className="mb-2">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-500">Price: ${book.price}</p>
              <p className="text-gray-500">image: ${book.image}</p>
              <img src={"http://localhost:8000/" + book.image} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
