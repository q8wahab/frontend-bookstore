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

export { getAllbooks };
