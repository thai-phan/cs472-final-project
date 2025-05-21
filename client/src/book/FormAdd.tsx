import React, {useContext, useState} from 'react'
import {BookContext} from "./App.tsx";


const FormAdd = () => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const {addBook} = useContext(BookContext)


  return (
      <div>
        <h2>Add Book</h2>
        <div className={"margin-5"}>
          <form>
            <div className={"margin-5"}>
              <label style={{display: "inline-block", width: 100}} htmlFor="title">Title</label>
              <input id={"title"} type="text" value={title} onChange={event => setTitle(event.target.value)}/>
            </div>
            <div className={"margin-5"}>
              <label style={{display: "inline-block", width: 100}} htmlFor="author">Author</label>
              <input id={"author"} type="text" value={author} onChange={event => setAuthor(event.target.value)}/>
            </div>
          </form>
          <button onClick={() => addBook(title, author)}>Add book</button>
        </div>


      </div>
  )
}

export default FormAdd