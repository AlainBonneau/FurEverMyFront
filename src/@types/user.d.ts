export interface IUser {
  id: number;
  avatar?: string;
  email: string;
  lastname: string;
  firstname: string;
  birthdate: string;
  password: string;
  arrival_date: string;
  leaving_date: string;
  role: string;
  is_active: boolean;
}
