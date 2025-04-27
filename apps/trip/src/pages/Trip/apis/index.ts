import httpService from "@/shared/cores/http";
export type DestinationType = {
  id: string;
  name: string;
};
const getHospitalList = async () => {
  return httpService.get<DestinationType[]>("/destination/list");
};

const addHospitals = async (destinations: unknown[]) => {
  return httpService.post<number>("/destination/add", destinations);
};

export { getHospitalList, addHospitals };
