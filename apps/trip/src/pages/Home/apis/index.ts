import httpService from "@/shared/cores/http";
export const HomeQueryKes = {
  GET_DEFAULT_TRIP_VIEW: "GET_DEFAULT_TRIP_VIEW",
  ADD_TRIP: "ADD_TRIP",
};
type TripViewType = {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
};
const getDefaultTripView = () => {
  return httpService.get<TripViewType[]>("document/v1/default-trip-views");
};
export { getDefaultTripView };
