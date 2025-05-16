import httpService from '@/shared/cores/http';
import { TripInfo } from '@/typings/trip.types';

export const addmapHistory = (mapHistory: { spendDate: string; mapInfo: TripInfo[] }) => {
  return httpService.post('/history/add', mapHistory);
};

export const removeHistory = (mapHistory: { spendDate: string; mapInfo: TripInfo[] }) => {
  return httpService.post('/history/add', mapHistory);
};
