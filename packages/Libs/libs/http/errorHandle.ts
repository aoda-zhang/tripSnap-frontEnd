import envConfig from "@/config";
import authAPI from "@/pages/Auth/apis";
import storage from "@/shared/utils/storage";
import { message } from "antd";
import { HttpBusinessMappingCode, commonHeader } from "./types";
const jwtExpiredHandle = async () => {
  try {
    if (storage.get(commonHeader.refreshToken)) {
      const newAuthToken = await authAPI.refreshToken({
        refreshToken: storage.get(commonHeader.refreshToken),
      });
      await storage.set(commonHeader["access-token"], newAuthToken?.accessToken);
      await storage.set(commonHeader.refreshToken, newAuthToken?.refreshToken);
    }
    throw new Error(`登陆信息有误，请重新检查`);
  } catch (error) {
    message.error(`登陆信息有误，请重新检查！${error}`);
    await storage.remove(commonHeader["access-token"]);
    await storage.remove(commonHeader.refreshToken);
    window.location.href = "/login";
  }
};

const httpErrorHandler = async (error) => {
  if (error?.data === HttpBusinessMappingCode.jwtexpired) {
    jwtExpiredHandle();
  }
  switch (error?.status ?? error?.statusCode) {
    case 401:
    case 403:
      jwtExpiredHandle();
      break;
    case 500:
      message.error(`${envConfig?.systemSettings?.commonErrorMessage}`);
      break;
    default:
      message.error(error?.message ? error?.message : `${envConfig?.systemSettings?.commonErrorMessage}`);
  }
};

export default httpErrorHandler;
