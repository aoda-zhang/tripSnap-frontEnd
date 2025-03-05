import httpService from "@/shared/libs/http";
export type DestinationType = {
  id: string;
  name: string;
};
class MapAPI {
  getHospitalList = async () => {
    return httpService.getAPI<DestinationType[]>("/destination/list");
  };

  addHospitals = async (destinations: unknown[]) => {
    return httpService.postAPI<number>("/destination/add", destinations);
  };
}
const mapAPI = new MapAPI();
export default mapAPI;
