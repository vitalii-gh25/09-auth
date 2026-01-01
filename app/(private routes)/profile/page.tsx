// import Image from 'next/image';

import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Your personal profile page on NoteHub',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Your personal profile page on NoteHub',
    url: 'https://notehub.com/profile',
  },
};

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          {user.avatar && (
            <img
              src={user.avatar} // берём полный URL с бекенда
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
