import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { MyContext } from "../App";
import moment from "moment";
import useValidateAuth from "../utils/authutiles";
import BASE_URL from "../../apiConfig";
const ReviewPage = ({ reviewData, productId ,allReviews}) => {
 
  const [open, setOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(Array.isArray(reviewData) ? reviewData : []);
  const context = useContext(MyContext);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validateAuth = useValidateAuth();
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!validateAuth()) return;
    let userId = JSON.parse(localStorage.getItem('user')).userId

    const reviewField = { review: reviewText, rating, productId };
    try {
      const result = await axios.post(`${BASE_URL}/review/add/${userId}`, reviewField, {
       
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

   
      allReviews()
      setReviewText("");
      setRating(0);
      context.setOpen({ open: true, message: result.data.message, severity: "success" });
      handleClose();
    } catch (error) {
      context.setOpen({
        open: true,
        message: error.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    console.log("Received reviewData:", reviewData); // Debugging log
  
    if (Array.isArray(reviewData)) {
      setReviews(reviewData);
    } else {
      setReviews([]); // Fallback to prevent `.map()` errors
    }
  }, [reviewData]);

  const averageRating = reviews.length
  ? Math.floor((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10) / 10
  : 0;
    console.log(averageRating)

  return (
    <div className="my-4 max-w-[1250px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
          <Rating value={averageRating} precision={0.1} readOnly size="medium" />
          <p className="text-xl font-semibold xs:text-[14px]">{averageRating}/5.0</p>
          </div>
          <span className="ml-2 text-gray-600">
            {reviews.length ? `(${reviews.length} reviews)` : "No reviews yet"}
          </span>
        </div>
        <button onClick={handleClickOpen} className="bg-primary text-white sm:px-4 sm:py-2 xs:text-[12px] xsp:text-[12px] xs:px-1 xs:py-0  rounded-md hover:bg-secondary mt-3">
          Write a review
        </button>
      </div>

      <hr className="my-2" />

      {reviews.length === 0 ? (
        <div className="text-gray-600">
          Be the first person to{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={handleClickOpen}>
            Write a review
          </span>
        </div>
      ) : (
        <div>
          {
            reviews &&
          reviews.slice(0)?.reverse()?.map((review, index) => (
            <div key={index} className="border p-4 mt-2 rounded-lg flex gap-4 shadow-md bg-white">
            {/* Avatar (First Letter of Name) */}
            <div className="bg-gray-300 xs:w-[40px] xs:h-[40px] xs:text-lg sm:w-[60px] sm:h-[60px] rounded-full flex items-center text-2xl justify-center text-black">
              {review.userId?.name   ? review?.userId?.name.charAt(0).toUpperCase():review.userId?.email.charAt(0).toUpperCase()}
            </div>
      
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium xs:text-[13px] text-nowrap">{review?.userId?.name}</p>
                <span className="text-gray-500 text-sm xs:text-[11px]">{moment(review.createdAt).format("DD MMM YYYY, hh:mm A")} </span>
              </div>
      
              {/* Rating */}
              <Rating value={review.rating} precision={0.5} readOnly size="small" />
      
              {/* Review Title & Text */}
           
              <p className="text-gray-600 xs:text-[12px]">{review.review}</p>
      
          
            </div>
          </div>
          ))}
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "90%",
            height: "400px",
            padding: "",
          },
        }}
      >
        <DialogTitle >Write a Review</DialogTitle>
        <DialogContent>
          <Rating
            name="user-rating"
            value={rating}
            precision={0.5}
            size="meduim"
            onChange={(event, newValue) => setRating(newValue)}
          />
          <div className="mt-4"></div>
          <TextField
            label="Your Review"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
         <div className="xs:hidden sm:flex">
         <Button onClick={handleSubmitReview} color="primary" disabled={!reviewText || rating === 0}>
            Submit Review
          </Button>
         </div>
        <div className="xs:flex sm:hidden">
        <Button onClick={handleSubmitReview} color="primary" disabled={!reviewText || rating === 0}>
            Submit 
          </Button>
        </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewPage;
