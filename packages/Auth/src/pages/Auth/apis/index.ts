import httpService from "@/shared/libs/http";
import type { AuthFieldType, LoginInfo } from "@/typings/auth.types";
class AuthAPI {
  register = (userInfo: AuthFieldType) => {
    return httpService.postAPI("/auth/register", userInfo);
  };

  login = (userInfo: Omit<AuthFieldType, "phoneNumber">) => {
    return httpService.postAPI<LoginInfo>("/auth/login", userInfo);
  };

  refreshToken = (token: { refreshToken: string }) => {
    return httpService.postAPI<LoginInfo>("/auth/refresh", token);
  };
}
const authAPI = new AuthAPI();
export default authAPI;
