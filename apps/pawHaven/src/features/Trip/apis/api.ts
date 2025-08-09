import httpService from '@shared/cores/http';

import { TripBasic } from '../Basic/validation';
import { TripDeatil } from '../Detail';

interface TripInfo {
  tripID: string;
  date: string;
  desination: string;
  shortLink: string;
}

interface TripSubmitionDataType {
  tripBasic: TripBasic | {};
  tripDetail?: (TripDeatil & { tripImages: string[] }) | {};
}

export const uploadTripFiles = (
  files: File[],
): Promise<{ fileIds: string[] }> => {
  return httpService.post('/trip/tripView/upload', files);
};
export const submitTrip = (data: TripSubmitionDataType) => {
  return httpService.post<TripInfo>('/trip/add', data);
};
