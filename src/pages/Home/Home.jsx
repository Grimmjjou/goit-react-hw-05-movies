import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/Movie-api';
import ListItem from 'components/ListItem/ListItem';
import styles from './Home.module.css';

const Home = () => {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(false);

  const genTrendingList = () => {
    movieAPI
      .moviesTrending()
      .then(movies => setTrending(movies))
      .catch(error => toast.error(`${error.message}`))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    genTrendingList();
  }, []);

  return (
    <section className={styles.trending}>
      <h2 className={styles.trending__header}>Trending today</h2>
      <ul className={styles.trending__list}>
        {trending &&
          trending.map(movie => {
            return <ListItem key={movie.id} name={movie.title} id={movie.id} />;
          })}
        {loading && <Loader />}
      </ul>
    </section>
  );
};

export default Home;
