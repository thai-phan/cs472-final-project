import type {IReview} from "./IReview.ts";
import React from "react";
import aaa from "../../public/user.svg"

const ReviewCard = ({review}: { review: IReview }) => {
  const ShowStar = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }
  return (
      <div className={"review flex"}>
        <div className="flex-1/2">
          <div className="review-user">
            <img className={"inline mr-2"} src={aaa} height={50} width={50} alt=""/>
            <span>{review.author}</span>
          </div>
          <div className="review-email">{review.authorEmail}</div>
          <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
          <div className="review-rating">{ShowStar(review.rating)}</div>

        </div>
        <div className={"flex flex-1/2"}>
          <div className={"flex-2/3"}>
            <div className="review-text">
              {review.comment}
            </div>
          </div>
          <div className={"flex-1/3"}>
            <div className={"mb-2"}>
              <button>Edit review</button>
            </div>
            <div>
              <button>Delete review</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ReviewCard