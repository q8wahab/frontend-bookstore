import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../api/auth";

const UpdateBookForm = ({ book, onClose }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedBook) => updateBook(book._id, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries("getallbooks");
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, author, price });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2 className="text-xl font-bold">Update Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookForm;
