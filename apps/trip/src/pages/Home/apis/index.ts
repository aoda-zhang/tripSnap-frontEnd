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
const addTrip = () => {
  return httpService.post("trip/v1/addTrip", { destination: "German", date: "2025-10-01", note: "Zhr shone Staht!" });
};
export { getDefaultTripView, addTrip };
