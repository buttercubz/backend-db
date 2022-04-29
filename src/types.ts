export interface NewUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verify_password: string;
  default_company: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  default_company: string;
  created_at: Date;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
