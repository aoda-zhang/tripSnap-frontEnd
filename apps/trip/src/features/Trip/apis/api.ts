import { Step1FormType } from '@/features/Trip/Step1/validation';
import { Step2FormType } from '@/features/Trip/Step2';
import httpService from '@/shared/cores/http';

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
export const addTripSummary = (data: Step2FormType) => {
  return httpService.post<Boolean>('/trip/tripDetail/add', data);
};
