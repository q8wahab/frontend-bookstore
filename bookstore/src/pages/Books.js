import React, { useEffect, useState } from "react";
import { delBook, getAllbooks, updateBook } from "../api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  // const [isLoading, setisLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: booksData, isLoading } = useQuery({
    queryKey: ["getallbooks"],
    queryFn: getAllbooks,
  });

  const { id } = useParams();

  const mutation = useMutation({
    mutationKey: ["deletebook"],
    mutationFn: (id) => delBook(id),
    onSuccess: (data) => {
      console.log("delete successful:", data);
      queryClient.invalidateQueries("getallbooks");
    },
  });

  const mutation2 = useMutation({
    mutationKey: ["updatebook"],
    mutationFn: (id) => updateBook(id),
    onSuccess: (data) => {
      console.log("updated successful:", data);
      queryClient.invalidateQueries("updatedbooks");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleUpdate = (id) => {
    mutation2.mutate(id);
  };

  // useEffect(() => {
  //   if (booksData) {
  //     console.log("Books Data:", booksData);
  //   }
  // }, [booksData]);

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
      <h1 className="text-2xl font-bold mb-4 text-center">Book List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData?.map((book) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p>BookID:{book?._id}</p>
              <h2 className="card-title">Title : {book.title}</h2>
              <p>Author : {book.author}</p>
              <p className="text-gray-500">Price: ${book.price}</p>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-500 text-white"
                onClick={() => handleDelete(book._id)}
              >
                DELETE
              </button>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-800 text-white"
                onClick={() => handleUpdate(book._id)}
              >
                Update
              </button>
            </div>
            <figure>
              <img src={"http://localhost:8000/" + book.image} alt="book" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
