import httpService from "@/shared/cores/http";
import type { AuthFieldType, LoginInfo } from "@/typings/auth.types";
const register = (userInfo: AuthFieldType) => {
  return httpService.post("/auth/register", userInfo);
};

const login = (userInfo: Omit<AuthFieldType, "phoneNumber">) => {
  return httpService.post<LoginInfo>("/auth/login", userInfo);
};

const refreshToken = (token: { refreshToken: string }) => {
  return httpService.post<LoginInfo>("/auth/refresh", token);
};
export { register, login, refreshToken };
