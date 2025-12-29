//components/Header/Header.tsx

import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={css.navigationLink} href="/notes/filter/all">
              Notes
            </Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
