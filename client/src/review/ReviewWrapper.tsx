import React, {useEffect, useState} from "react";

import ReviewCard from "./ReviewCard.tsx";
import type {IReview} from "./IReview.ts";
import ReviewAddForm from "./ReviewAddForm.tsx";




const ReviewWrapper = ({id}: { id: string }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);


  const loadReviews = () => {
    fetch(`http://localhost:3000/products/${id}/reviews`).then(res => res.json()).then(json => {
      console.log(json)
      setReviews(json)
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
          {/*<div className="reviews-filter">*/}
          {/*  <span>Sort by:</span>*/}
          {/*  <select>*/}
          {/*    <option value="newest">Newest</option>*/}
          {/*    <option value="oldest">Oldest</option>*/}
          {/*    <option value="highest">Highest rating</option>*/}
          {/*    <option value="lowest">Lowest rating</option>*/}
          {/*  </select>*/}


          {/*</div>*/}
          <div>
            {
              reviews.map((review, index) => (
                  <ReviewCard key={index} review={review}/>
              ))
            }
          </div>
        </div>
      </div>

  )
}

export default ReviewWrapper