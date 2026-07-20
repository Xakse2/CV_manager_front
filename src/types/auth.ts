export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type AuthState = {
  accessToken: string | null;
  user: User | null;
};

export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "CANDIDATE" | "RECRUITER";
};

export type RefreshResponse = {
  accessToken: string;
  user: AuthUser;
};
