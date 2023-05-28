import { useState, useEffect, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/Movie-api';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setLoading(true);
    movieAPI
      .movieDetails(movieId)
      .then(result => setMovie(result))
      .catch(error => toast.error(`${error.message}`))
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={styles.movieDetails}>
          <Link
            to={location.state?.from ?? '/movies'}
            className={styles.goBackBtn}
          >
            Go back
          </Link>
          <div className={styles.basicInfo}>
            <img
              src={`${BASE_IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              width="280"
            />
            <div className={styles.movieInfo}>
              <h2 className={styles.name}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p className={styles.description}>User Score:</p>
              <h3 className={styles.title}>Overview</h3>
              <p className={styles.description}>{movie.overview}</p>
              <h4 className={styles.title}>Genres</h4>
              <p className={styles.description}>
                {movie.genres.map(genre => {
                  return `${genre.name} `;
                })}
              </p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h5 className={styles.secondaryTitle}>Additional Information:</h5>
            <Link
              to={`/movies/${movie.id}/cast`}
              className={styles.link}
              state={{ from: location.state?.from ?? '/movies' }}
            >
              Cast
            </Link>
            <Link
              to={`/movies/${movie.id}/reviews`}
              className={styles.link}
              state={{ from: location.state?.from ?? '/movies' }}
            >
              Reviews
            </Link>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default MovieDetails;
