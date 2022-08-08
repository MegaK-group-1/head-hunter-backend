export type LoginUserResponse = {
  success: boolean;
};

export type RegisterUserResponse = LoginUserResponse;

export type LogoutUserResponse = RegisterUserResponse;

export type VerifyUserResponse = LogoutUserResponse;
