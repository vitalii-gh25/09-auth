// types/user.ts

// Прибрано id — за вимогою інтерфейс повинен містити
// лише username, email та avatar
export interface User {
  username: string;
  email: string;
  avatar: string;
}
