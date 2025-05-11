import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import { useAuth } from '../../context/AuthContext.js';
import { useCart } from '../../context/CartContext.js';
import styles from './FoodItem.module.css';

const FoodItem = () => {
  const { id } = useParams();
  const { userId, user } = useAuth();
  const { addToCart } = useCart();
  const { data: foodItem, loading, error } = useFetch(`http://localhost:8800/api/fooditems/${id}`);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const res = await fetch(`http://localhost:8800/api/reviews/${id}`);
          const data = await res.json();
          setReviews(data);
        } catch (err) {
          console.error('Error fetching reviews:', err);
        }
      };
      fetchReviews();
    }
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!newReview.trim()) return;

    setReviewLoading(true);
    try {
      const res = await fetch('http://localhost:8800/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          foodId: id,
          rating,
          comment: newReview,
        }),
      });

      if (res.ok) {
        const { review } = await res.json();
        const populatedReview = {
          ...review,
          userId: {
            _id: userId,
            firstName: user?.firstName || 'Unknown',
            lastName: user?.lastName || '',
          },
        };
        setReviews((prev) => [...prev, populatedReview]);
        setNewReview('');
        setRating(5);
      } else {
        console.error('Error submitting review');
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (foodItem) {
      addToCart(foodItem);
    }
  };

  return (
    <div className={styles.foodItemPage}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div className={styles.foodItemDetails}>
          <img src={foodItem.imageUrl} alt={foodItem.name} className={styles.foodItemImg} />
          <div className={styles.foodItemInfo}>
            <h1>{foodItem.name}</h1>
            <p>{foodItem.description}</p>
            <p><strong>Price:</strong> ${foodItem.price}</p>
            <p><strong>Category:</strong> {foodItem.category}</p>
            <p><strong>Ingredients:</strong> {foodItem.ingredients.join(', ')}</p>
            {foodItem.isFeatured && <span className={styles.featuredBadge}>Featured</span>}
            {userId && (
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to Cart</button>
            )}
          </div>
        </div>
      )}

      <div className={styles.reviewsSection}>
        <h2>Reviews</h2>

        {userId && (
          <div className={styles.reviewInput}>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write a review..."
            />
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
              ))}
            </select>
            <button onClick={handleReviewSubmit} disabled={reviewLoading}>
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        )}

        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>
                    {review.userId?.firstName} {review.userId?.lastName}
                  </span>
                  <span className={styles.reviewRating}>⭐ {review.rating} / 5</span>
                </div>
                <p className={styles.reviewComment}>
                  "{review.comment}"
                </p>
                <small className={styles.reviewTimestamp}>
                  {new Date(review.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
