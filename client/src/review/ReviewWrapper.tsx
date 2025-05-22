import React, {createContext, type Dispatch, type SetStateAction, useEffect, useState} from "react";

import ReviewCard from "./ReviewCard.tsx";
import type {IReview} from "./IReview.ts";
import ReviewAddForm from "./ReviewAddForm.tsx";
import ReviewEditForm from "./ReviewEditForm.tsx";

interface ReviewContextProps {
  loadReviews: () => void;
  addReview: (author: string, email: string, rating: number, comment: string) => void;
  onDeleteReview: (reviewId: number | undefined) => void;
  onEditReview: (review: IReview) => void
}


export const ReviewContext = createContext<ReviewContextProps>({
  loadReviews: () => {},
  addReview: (author: string, email: string, rating: number, comment: string) => {},
  onDeleteReview: (reviewId: number | undefined) => {},
  onEditReview: (review: IReview) => {}
});

const ReviewWrapper = ({id}: { id: string }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview>({
    id: 0,
    productId: 1,
    author: "string",
    authorEmail: "string",
    rating: 5,
    comment: "comment",
    date: new Date(),
  } as IReview);

  const loadReviews = () => {
    fetch(`http://localhost:3000/products/${id}/reviews`)
        .then(res => res.json()).then(json => {
      console.log(json)
      setReviews(json)
    })
  }

  const addReview = (author: string, email: string, rating: number, comment: string) => {
    const review: IReview = {
      productId: parseInt(id),
      author,
      authorEmail: email,
      rating,
      comment,
      date: new Date(),
    };

    fetch(`http://localhost:3000/products/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).then(res => {
      if (res.ok) {
        loadReviews()
        // alert("Review added successfully");
      } else {
        alert("Failed to add review");
      }
    }).then()
  }


  const onDeleteReview = (reviewId: number | undefined) => {
    if (!reviewId) return;
    fetch(`http://localhost:3000/products/${id}/reviews/${reviewId}`, {
      method: "DELETE"
    }).then(res => res.json())
        .then(json => {
          console.log(json)
          loadReviews()
        })
  }

  const onEditReview = (review: IReview) => {
    if (!review) return;
    fetch(`http://localhost:3000/products/${id}/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
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
      <ReviewContext value={{loadReviews, addReview, onDeleteReview, onEditReview}}>
        <div className={"flex"}>
          <div className={"bg-[#fff] rounded-lg flex-1/4 mr-3 p-2"}>
            <ReviewAddForm onAdd={addReview}/>
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
                    <ReviewCard key={index} review={review} setReview={setSelectedReview}/>
                ))
              }
            </div>
          </div>
        </div>
        <div>
            <ReviewEditForm review={selectedReview} />
        </div>
      </ReviewContext>
  )
}

export default ReviewWrapper