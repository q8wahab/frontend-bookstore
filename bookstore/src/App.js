import React from "react";
import BooksPage from "./components/Books";

const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 p-4 text-white text-center">
        <h1 className="text-3xl">My Bookstore</h1>
      </header>
      <main className="p-4"></main>
      <BooksPage />
    </div>
  );
};

export default App;
