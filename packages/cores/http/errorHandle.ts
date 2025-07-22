import toast from 'react-hot-toast';

import { HttpBusinessMappingCode } from './types';

// import { AuthAPI } from '@/apis';
import envConfig from '@/config';

// const jwtExpiredHandle = async () => {
//   try {
//     if (storageTool.get(commonHeader.refreshToken)) {
//       const newAuthToken = await AuthAPI.refreshToken({
//         refreshToken: storageTool.get(commonHeader.refreshToken),
//       });
//       await storageTool.set(
//         commonHeader['access-token'],
//         newAuthToken?.accessToken,
//       );
//       await storageTool.set(
//         commonHeader.refreshToken,
//         newAuthToken?.refreshToken,
//       );
//     }
//     throw new Error('登陆信息有误，请重新检查');
//   } catch (error) {
//     message.error(`登陆信息有误，请重新检查！${error}`);
//     await storageTool.remove(commonHeader['access-token']);
//     await storageTool.remove(commonHeader.refreshToken);
//     if (typeof window !== 'undefined') {
//       // eslint-disable-next-line no-undef
//       window.location.href = '/login';
//     }
//   }
// };

const httpErrorHandler = async (error: {
  data: any;
  isSuccess?: boolean;
  message: any;
  status: any;
  statusCode?: any;
}) => {
  if (error?.data === HttpBusinessMappingCode.jwtexpired) {
    // jwtExpiredHandle();
  }
  switch (error?.status ?? error?.statusCode) {
    case 401:
    case 403:
      // jwtExpiredHandle();
      break;
    case 500:
      toast.error(`${envConfig?.systemSettings?.commonErrorMessage}`);
      break;
    default:
      toast.error(
        error?.message
          ? error?.message
          : `${envConfig?.systemSettings?.commonErrorMessage}`,
      );
  }
};

export default httpErrorHandler;
