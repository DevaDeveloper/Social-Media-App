interface LoginModel {
  username: string;
  password: string;
}
interface TokenModel {
  accessToken: string;
  refreshToken: string;
}
export type { LoginModel, TokenModel };
export default {};
