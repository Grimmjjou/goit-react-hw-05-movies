import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <NavLink to="/" className={styles.header__link}>
          Home
        </NavLink>
        <NavLink to="/movies" className={styles.header__link}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
