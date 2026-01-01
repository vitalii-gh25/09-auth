// app/(private routes)/profile/edit/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  // State инициализируем сразу из user
  const [username, setUsername] = useState(user?.username ?? '');

  if (!user || !isAuthenticated) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Отправляем только email и username, как требует API
      const updatedUser = await updateMe({
        email: user.email,
        username,
      });

      setUser(updatedUser); // обновляем store
      router.push('/profile'); // редирект на страницу профиля
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleCancel = () => router.push('/profile');

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* Аватар через обычный img */}
        {user.avatar && (
          <img
            src={user.avatar} // полный URL с бекенда
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
