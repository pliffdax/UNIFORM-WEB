// User types

export interface User {
  id: string;
  username: string;
  email: string;
  isStaff: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithProfile extends User {
  profile: UserProfile | null;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

// UserProfile types

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
  group: string;
  facultyId: number;
  questions: number;
  answers: number;
  avatarUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileDto {
  firstName: string;
  lastName: string;
  role: string;
  group: string;
  facultyId: number;
  avatarUrl: string | null;
  status: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  role?: string;
  group?: string;
  facultyId?: number;
  avatarUrl?: string | null;
  status?: string;
}

// Auth response

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserWithProfile;
}

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  isStaff: boolean;

  profile: UserProfile | null;
}

// Faculty types

export interface Faculty {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userProfiles: UserProfile[];
}
