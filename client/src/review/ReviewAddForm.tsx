import React, {type ChangeEvent, useState} from "react";


const ReviewAddForm = ({onAdd}: {
  onAdd: (author: string, email: string, rating: number, comment: string) => void
}) => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("5");


  const onAddLocal = () => {
    onAdd(author, email, parseInt(rating), comment)
  }

  return (

      <div className="review-form">
        <div className="form-title">Write a Review</div>

        <select className="select" required value={rating} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setRating(e.target.value)
        }}>
          <option value="5">★★★★★ - Excellent</option>
          <option value="4">★★★★☆ - Good</option>
          <option value="3">★★★☆☆ - Average</option>
          <option value="2">★★☆☆☆ - Poor</option>
          <option value="1">★☆☆☆☆ - Terrible</option>
        </select>

        <div className={"margin-5"}>
          <label style={{display: "inline-block", width: 100}} htmlFor="author">Name</label>
          <input className={"input"} id={"author"} type="text" value={author}
                 onChange={event => setAuthor(event.target.value)}/>
        </div>
        <div className={"margin-5"}>
          <label style={{display: "inline-block", width: 100}} htmlFor="email">Email</label>
          <input className={"input"} id={"email"} type="text" value={email}
                 onChange={event => setEmail(event.target.value)}/>
        </div>
        <div className={"margin-5"}>
          <label style={{display: "inline-block", width: 100}} htmlFor="comment">Comment</label>
          <textarea className={"textarea"} id={"comment"} rows={5} value={comment}
                    onChange={event => setComment(event.target.value)}/>
        </div>
        <div className={"mt-3"}>
          <button className={"btn btn-soft btn-info"} onClick={onAddLocal}>Add review</button>
        </div>
      </div>
  )
}
export default ReviewAddForm