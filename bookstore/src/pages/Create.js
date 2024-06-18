import React, { useState } from "react";
import { createBook } from "../api/auth"; // Adjust the path if necessary

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createBook(title, author, price, image);
      setSuccess("Book created successfully!");
      // Clear the form fields
      setTitle("");
      setAuthor("");
      setPrice("");
      setImage(null);
    } catch (error) {
      setError("Error creating book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-fit space-y-4"
      >
        <label className="input input-bordered flex items-center gap-2">
          Title
          <input
            type="text"
            className="grow"
            placeholder="Lion King"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Author
          <input
            type="text"
            className="grow"
            placeholder="Abdulwahab"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Price
          <input
            type="number"
            className="grow"
            placeholder="5$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <kbd className="kbd kbd-sm">$</kbd>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="input input-bordered flex items-center gap-2"
          onChange={handleImageChange}
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
      </form>
    </div>
  );
};

export default Create;
