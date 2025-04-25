import httpService from "@/shared/cores/http";
export const HomeQueryKes = {
  GET_DEFAULT_TRIP_VIEW: "GET_DEFAULT_TRIP_VIEW",
};
type TripViewType = {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
};
const getDefaultTripView = () => {
  return httpService.get<TripViewType[]>("v1/document/default-trip-views");
};
export { getDefaultTripView };
