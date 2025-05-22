import type {IReview} from "./IReview.ts";
import React, {type Dispatch, type SetStateAction} from "react";
import userImg from "../../public/user.svg"
import ReviewEditForm from "./ReviewEditForm.tsx";
import {ReviewContext} from "./ReviewWrapper.tsx";
import {ShowStar} from "../product/ProductPage.tsx";

const ReviewCard = ({review, setReview}: { review: IReview, setReview: Dispatch<SetStateAction<IReview>> }) => {

  const {onDeleteReview} = React.useContext(ReviewContext);



  const onEditLocal = () => {
    (document.getElementById('review_modal') as HTMLFormElement).showModal();
    setReview(review)
  }

  return (
      <div className={"review flex"}>
        <div className="flex-1/2">
          <div className="review-user">
            <img className={"inline mr-2"} src={userImg} height={50} width={50} alt=""/>
            <span>{review.author}</span>
          </div>
          <div className="review-rating">{ShowStar(review.rating)}</div>
          <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>

        </div>
        <div className={"flex flex-1/2"}>
          <div className={"flex-2/3"}>
            <div className="review-text">
              {review.comment}
            </div>
          </div>

          <div className={"flex-1/3"}>
            <div className={"mb-2"}>
              <button className="btn" onClick={onEditLocal}>Edit</button>
            </div>
            <div>
              <button className={"btn btm-sm"} onClick={() => onDeleteReview(review.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ReviewCard