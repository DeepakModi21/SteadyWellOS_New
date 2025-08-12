export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  license_number: string;
  role: 'UserRole.NURSE' | 'UserRole.ADMIN' | 'UserRole.DOCTOR'; // extend as needed
  is_active: boolean;
  created_at: string;   // or Date if you parse it
  updated_at: string;
  last_login_at: string | null;
}
