import httpService from '@shared/cores/http';

import { Step1FormType } from '@/features/Trip/Step1/validation';
import { Step2SubmitType } from '@/features/Trip/Step2';

export const addTripBasicInfo = (
  info: Step1FormType,
): Promise<{ tripId: string }> => {
  return httpService.post('/trip/tripInfo/add', info);
};
export const uploadTripFiles = (
  files: File[],
): Promise<{ fileIds: string[] }> => {
  return httpService.post('/trip/tripView/upload', files);
};
export const addTripSummary = (data: Step2SubmitType) => {
  return httpService.post<{ tripID: string }>('/trip/tripDetail/add', data);
};
