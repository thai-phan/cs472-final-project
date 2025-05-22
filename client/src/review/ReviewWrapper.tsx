import React, {useEffect, useState} from "react";

import ReviewCard from "./ReviewCard.tsx";
import type {IReview} from "./IReview.ts";
import ReviewAddForm from "./ReviewAddForm.tsx";


const ReviewWrapper = ({id}: { id: string }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);


  const loadReviews = () => {
    fetch(`http://localhost:3000/products/${id}/reviews`)
        .then(res => res.json()).then(json => {
      console.log(json)
      setReviews(json)
    })
  }

  const onDeleteReview = (reviewId: number) => {
    fetch(`http://localhost:3000/products/${id}/reviews/${reviewId}`, {
      method: "DELETE"
    }).then(res => res.json())
        .then(json => {
          console.log(json)
          loadReviews()
        })
  }

  const onEditReview = (reviewId: number) => {
    fetch(`http://localhost:3000/products/${id}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(res => res.json())
        .then(json => {
          console.log(json)
          loadReviews()
        })
  }

  useEffect(() => {
    loadReviews()
  }, []);

  return (
      <div className={"flex"}>
        <div className={"bg-[#fff] rounded-lg flex-1/4 mr-3 p-2"}>
          <ReviewAddForm id={id}/>
        </div>
        <div className="reviews-section flex-3/4">
          <div className="reviews-title flex">
            <div className={"flex-3/4"}>
              <span>Customer Reviews</span>
            </div>
          </div>
          <div className="mb-3">{reviews.length} reviews</div>
          <div>
            {
              reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} onDelete={onDeleteReview} onEdit={onEditReview}/>
              ))
            }
          </div>
        </div>
      </div>

  )
}

export default ReviewWrapper