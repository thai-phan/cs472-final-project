import React, {useContext, useEffect, useState} from 'react'
import {BookContext} from "./App.tsx";


const FormUpdate = () => {
  const [formTitle, setFormTitle] = useState("")
  const [formAuthor, setFormAuthor] = useState("")
  const [formId, setFormId] = useState("")

  const {updateBook, curBook} = useContext(BookContext)
  const {id, title, author} = curBook

  useEffect(() => {
    if (title) {
      setFormAuthor(title)
    }
    if (author) {
      setFormTitle(author)
    }
    if (id) {
      setFormId(id)
    }
  }, [author, title, id]);

  return (
      <div>
        <h2>Update Book</h2>
        <div className={"margin-5"}>
          <form>
            <div className={"margin-5"}>
              <label style={{display: "inline-block", width: 100}} htmlFor="title">ID</label>
              <input id={"title"} type="text" value={formId} disabled={true}/>
            </div>
            <div className={"margin-5"}>
              <label style={{display: "inline-block", width: 100}} htmlFor="title">Title</label>
              <input id={"title"} type="text" value={formTitle} onChange={event => setFormTitle(event.target.value)}/>
            </div>
            <div className={"margin-5"}>
              <label style={{display: "inline-block", width: 100}} htmlFor="author">Author</label>
              <input id={"author"} type="text" value={formAuthor}
                     onChange={event => setFormAuthor(event.target.value)}/>
            </div>
          </form>
          <button onClick={() => updateBook(id, formTitle, formAuthor)}>Update Book</button>
        </div>
      </div>
  )
}

export default FormUpdate