import { ImportError } from './import';

export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr',
  STUDENT = 'student',
}

export enum UserStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  EMPLOYED = 'employed',
}

export enum ExpectedTypeWork {
  'AT_LOCATION' = 'at_location',
  'READY_TO_MOVE_OUT' = 'ready_to_move_out',
  'REMOTELY' = 'remotely',
  'Hybrid' = 'hybrid',
  'NO_MATTER' = 'no_matter',
}

export enum ExpectedContractType {
  'UOP' = 'uop',
  'B2B' = 'b2b',
  'UZ/UOD' = 'uz/uod',
  'NO_MATTER' = 'no_matter',
}

export interface ImportUsersResponse {
  imported: string[];
  errors: ImportError[];
}
