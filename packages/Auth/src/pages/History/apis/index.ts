import httpService from "@/shared/libs/http";
import type { TripInfo } from "@/typings/trip.types";

class HistoryAPI {
  addmapHistory = (mapHistory: { spendDate: string; mapInfo: TripInfo[] }) => {
    return httpService.postAPI("/history/add", mapHistory);
  };
}
const historyAPI = new HistoryAPI();
export default historyAPI;
