import { UserProfile } from './auth.types';

export interface Faculty {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFacultyDto {
  name: string;
}

export interface UpdateFacultyDto {
  name?: string;
}

export interface FacultyWithUserProfiles extends Faculty {
  userProfiles: UserProfile[];
}
