import { Link, useLocation } from 'react-router-dom';
import styles from './ListItem.module.css';
import PropTypes from 'prop-types';

const ListItem = ({ name, id }) => {
  const location = useLocation();

  return (
    <li className={styles.item}>
      <Link
        to={`/movies/${id}`}
        state={{ from: location }}
        className={styles.link}
      >
        {name}
      </Link>
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ListItem;
