interface LoginModel {
  username: string;
  password: string;
}
interface TokenModel {
  accessToken: string;
  refreshToken: string;
}

interface CurrentUser {
  id: string;
  email: string;
  exp: number;
  iat: number;
  type: string;
  userType: string;
}

export type { LoginModel, TokenModel, CurrentUser };
export default {};
