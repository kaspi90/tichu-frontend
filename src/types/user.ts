export interface User {
  id?: number;
  email: string;
  firstname?: string;
  lastname?: string;
  password: string;
  image?: String;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type UserUpdateInput = {
  firstname: string;
  lastname: string;
  email: string;
  confirmEmail?: string;
  password?: string;
  image?: String;
  confirmPassword?: string;
};
