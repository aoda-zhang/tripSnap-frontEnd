import httpService from '@/shared/cores/http';

type TripViewType = {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
};
export const getDefaultTripView = (): Promise<TripViewType[]> => {
  return httpService.get('document/v1/default-trip-views');
};
export const getDefaultTransport = (): Promise<TripViewType[]> => {
  return httpService.get('document/v1/default-trip-transport');
};
