import httpService from "@/shared/cores/http";
import type { TripInfo } from "@/typings/trip.types";
const addmapHistory = (mapHistory: { spendDate: string; mapInfo: TripInfo[] }) => {
  return httpService.post("/history/add", mapHistory);
};
export { addmapHistory };
