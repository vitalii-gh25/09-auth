'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getMe().then(user => {
      setUserName(user.userName ?? '');
      setPhotoUrl(user.photoUrl ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : '';
      await updateMe({ userName, photoUrl: newPhotoUrl });
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  const router = useRouter();

  const handleCancel = () => {
    router.push('/profile'); // редирект на страницу профиля
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="userName">Username:</label>
            <input
              id="userName"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

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
