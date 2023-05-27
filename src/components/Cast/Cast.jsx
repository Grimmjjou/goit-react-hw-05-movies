import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/Movie-api';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setLoading(true);
    movieAPI
      .Cast(movieId)
      .then(result => setCast(result.cast))
      .catch(error => toast.error(`${error.message}`))
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast &&
        cast.map(actor => {
          return (
            <li className={styles.castMember} key={actor.cast_id}>
              {actor.profile_path ? (
                <img
                  src={`${BASE_IMG_URL}${actor.profile_path}`}
                  alt=""
                  width="180"
                  className={styles.photo}
                />
              ) : (
                <img
                  src="https://dummyimage.com/500x750/e3dcdc/0c18c4.jpg&text=Nothing"
                  alt=""
                  width="180"
                  className={styles.photo}
                />
              )}
              <div>
                <p className={styles.name}>{actor.name}</p>
                <p className={styles.character}>Character:</p>
                {actor.character ? (
                  <p className={styles.characterName}>{actor.character}</p>
                ) : (
                  <p className={styles.characterName}>Cameo</p>
                )}
              </div>
            </li>
          );
        })}
      {loading && <Loader />}
    </ul>
  );
};

export default Cast;
