// components/AuthNavigation/AuthNavigation.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link className={css.navigationLink} href="/profile">
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}> {user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link className={css.navigationLink} href="/sign-in">
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link className={css.navigationLink} href="/sign-up">
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
