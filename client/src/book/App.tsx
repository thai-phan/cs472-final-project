import React, {useEffect, useState} from 'react'
import './App.css'
import Book from "./Book.tsx";
import BookList from "./BookList.tsx";
import FormAdd from "./FormAdd.tsx";
import FormUpdate from "./FormUpdate.tsx";
import {NavLink, Route, Routes} from "react-router";


export const BookContext = React.createContext({
  books: null, updateBook: null, addBook: null, deleteBook: null, curBook: null, setCurBook: null,
});

// The list of books.
// Functions for adding, updating, and deleting books.
// Loading and error states for API calls.


function App() {
  const [books, setBooks] = useState(0)

  const [curBook, setCurBook] = useState({})

  const loadData = () => {
    fetch("https://681cfa43f74de1d219ae6e44.mockapi.io/books")
        .then(response => response.json()).then(data => setBooks(data))
  }

  useEffect(() => {
    loadData()
  }, []);

  const updateBook = (id, title, author) => {
    fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books/${id}`, {
      method: "PUT", body: JSON.stringify({
        title: title, author: author
      }), headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      if (response.ok) {
        alert("Update book success!")
        return response.json()
      }
      throw new Error('Update book fail!');
    }).then(data => {
      console.log(data)
      loadData()
    }).catch(err => console.error(err))
  }

  const addBook = (title, author) => {
    fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books`, {
      method: "POST", body: JSON.stringify({
        title: title, author: author
      }), headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      if (response.ok) {
        alert("Add book success!")
        return response.json();
      }
      throw new Error('Add book fail!');
    }).then(data => {
      console.log(data)
      loadData()
    }).catch(err => console.error(err))
  }


  const deleteBook = (id) => {
    fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books/${id}`, {
      method: "DELETE",
    }).then(response => {
      if (response.ok) {
        alert("Delete book success!")
        return response.json()
      }
      throw new Error('Delete book fail!');
    }).then(data => {
      console.log(data)
      loadData()
    }).catch(err => console.error(err))
  }


  return (<BookContext.Provider value={{
    books, curBook, setCurBook: setCurBook, addBook: addBook, updateBook: updateBook, deleteBook: deleteBook
  }}>
    <h1>
      Product management
    </h1>
    <nav>
      <NavLink className={"margin-5"} to="/book-list">Book List</NavLink>
      <NavLink className={"margin-5"} to="/add-book">Add Book</NavLink>
      <NavLink className={"margin-5"} to="/update-book">Update Book</NavLink>
    </nav>

    {/*Split the application into smaller components (AddBook, ListBooks, EditBook) and*/}

    <div className={"layout-grid"}>
      <div className={"margin-10 border"}>
        <Routes>
          <Route path="/book-list" element={<BookList/>}/>
          <Route path="/add-book" element={<FormAdd/>}/>
          <Route path="/update-book" element={<FormUpdate/>}/>
        </Routes>

        {/*<BookList></BookList>*/}
      </div>


    </div>

  </BookContext.Provider>)
}

export default App
