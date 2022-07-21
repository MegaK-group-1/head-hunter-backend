export enum userRole {
  ADMIN = 'admin',
  HR = 'hr',
  STUDENT = 'student',
}

export enum studentStatus {
  AVAILABLE = 'available',
  INCONVERSATION = 'in_conversation',
}

export type registerUserResponse = {
  isSuccess: true;
};
