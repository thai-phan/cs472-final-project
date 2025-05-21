// import React, {useContext} from "react";
// import {BookContext} from "./App.tsx";

const Book = (props: any) => {

  const {book} = props

  // const {setCurBook, deleteBook} = useContext(BookContext)

  return (
      <tr>
        <td> {book.id}</td>
        <td> {book.title}</td>
        <td> {book.author}</td>
        <td>
          {/*<button onClick={() => setCurBook(book)}>Select to Update</button>*/}
        </td>
        <td>
          {/*<button onClick={() => deleteBook(book.id)}>Delete</button>*/}
        </td>
      </tr>
  )
}

export default Book