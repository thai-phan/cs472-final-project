import React, {type ChangeEvent, useContext, useEffect, useState} from "react";
import type {IReview} from "./IReview.ts";
import {ReviewContext} from "./ReviewWrapper.tsx";


const ReviewEditForm = ({review}: { review: IReview }) => {
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);

  const {onEditReview} = useContext(ReviewContext);

  useEffect(() => {
    console.log(review)
    setComment(review.comment)
    setRating(review.rating)
  }, [review]);


  const onEditLocal = () => {
    onEditReview({
      id: review.id,
      productId: review.productId,
      author: review.author,
      authorEmail: review.authorEmail,
      rating: rating,
      comment: comment,
      date: new Date(),
    } as IReview);
  }

  return (
      <div className="review-form">

        <dialog id="review_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="form-title">Update review</div>

            <div className={"m-2"}>
              <label style={{display: "inline-block", width: 120}} htmlFor="author">Update rating</label>
              <select id={"rating"} className="select" required value={rating}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setRating(parseInt(e.target.value))
                      }}>
                <option value="5">★★★★★ - Excellent</option>
                <option value="4">★★★★☆ - Good</option>
                <option value="3">★★★☆☆ - Average</option>
                <option value="2">★★☆☆☆ - Poor</option>
                <option value="1">★☆☆☆☆ - Terrible</option>
              </select>
            </div>

            <div className={"m-2"}>
              <label style={{display: "inline-block", width: 120}} htmlFor="comment">Comment</label>
              <textarea className={"textarea"} id={"comment"} rows={5} value={comment}
                        onChange={event => setComment(event.target.value)}/>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={onEditLocal}>Submit</button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
  )
}
export default ReviewEditForm