import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/Movie-api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    movieAPI
      .reviews(movieId)
      .then(result => {
        if (result.results.length > 0) {
          setReviews(result.results);
        } else {
          setEmpty(true);
        }
      })
      .catch(error => toast.error(`${error.message}`))
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <ul className={styles.reviewsList}>
      {loading && <Loader />}

      {reviews &&
        reviews.map(review => {
          return (
            <li className={styles.review} key={review.id}>
              <h3 className={styles.author}> Author: {review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          );
        })}

      {empty && (
        <p className={styles.empty}>
          We don't have any reviews for this movies.
        </p>
      )}
    </ul>
  );
};

export default Reviews;
