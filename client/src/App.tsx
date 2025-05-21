import React, {useEffect, useState} from 'react'
import './App.css'
import {NavLink, Route, Routes} from 'react-router';
import type { IProduct } from './product/IProduct';


export const BookContext = React.createContext({
});

// The list of books.
// Functions for adding, updating, and deleting books.
// Loading and error states for API calls.


function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  const [curBook, setCurBook] = useState({})

  const loadData = () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json()).then(data => setProducts(data))
  }

  useEffect(() => {
    loadData()
  }, []);

  // const updateBook = (id: any, title, author) => {
  //   fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books/${id}`, {
  //     method: "PUT", body: JSON.stringify({
  //       title: title, author: author
  //     }), headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then(response => {
  //     if (response.ok) {
  //       alert("Update book success!")
  //       return response.json()
  //     }
  //     throw new Error('Update book fail!');
  //   }).then(data => {
  //     console.log(data)
  //     loadData()
  //   }).catch(err => console.error(err))
  // }
  //
  // const addBook = (title: any, author: any) => {
  //   fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books`, {
  //     method: "POST", body: JSON.stringify({
  //       title: title, author: author
  //     }), headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then(response => {
  //     if (response.ok) {
  //       alert("Add book success!")
  //       return response.json();
  //     }
  //     throw new Error('Add book fail!');
  //   }).then(data => {
  //     console.log(data)
  //     loadData()
  //   }).catch(err => console.error(err))
  // }


  // const deleteBook = (id) => {
  //   fetch(`https://681cfa43f74de1d219ae6e44.mockapi.io/books/${id}`, {
  //     method: "DELETE",
  //   }).then(response => {
  //     if (response.ok) {
  //       alert("Delete book success!")
  //       return response.json()
  //     }
  //     throw new Error('Delete book fail!');
  //   }).then(data => {
  //     console.log(data)
  //     loadData()
  //   }).catch(err => console.error(err))
  // }


  return (<BookContext.Provider value={{}}>
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
        <div>
          {
            products && products.map((product, idx) => <div key={idx}>{product.name}</div>)
          }
        </div>
        {/*<Routes>*/}
        {/*  <Route path="/book-list" element={<div>aaaa</div>}/>*/}
        {/*  <Route path="/add-book" element={<div>bbb</div>}/>*/}
        {/*  <Route path="/update-book" element={<div>ccc</div>}/>*/}
        {/*</Routes>*/}

        {/*<BookList></BookList>*/}
      </div>


    </div>

  </BookContext.Provider>)
}

export default App
