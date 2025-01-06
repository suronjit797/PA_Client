export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  role: string;
  password: string;
  confirm?: string;
}
