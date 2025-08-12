export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  license_number: string;
  phone_number: string;
  role: string; // You could create a union or enum for UserRole if needed
  is_active: boolean;
  created_at: string; // or Date if you plan to parse it
  updated_at: string;
  last_login_at: string;
}
export interface LoginPayload {
  username: string;
  password: string;
}