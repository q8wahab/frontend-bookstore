import axios from "axios";
import instance from ".";

const getAllbooks = async () => {
  try {
    const { data } = await instance.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const createBook = async (title, author, price, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("price", price);
  formData.append("image", image);

  try {
    const res = await instance.post("/", formData);
    return res.data;
  } catch (error) {
    console.error("Error during creating a book:", error);
    throw error;
  }
};

const delBook = async (id) => {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error during deleting a book:", error);
    throw error;
  }
};

export { getAllbooks, createBook, delBook };
