import httpService from "@/shared/cores/http";
import { Step2FormType } from "../Step2";
import { Step1FormType } from "../Step1/validation";

const addTripBasicInfo = (info: Step1FormType) => {
  return httpService.post<{ tripId: string }>("/trip/tripInfo/add", info);
};
const uploadTripFiles = (files: File[]) => {
  return httpService.post<{ fileIds: string[] }>("/trip/tripView/upload", files);
}
const addTripSummary = (data: Step2FormType) => {
  return httpService.post<Boolean>("/trip/tripDetail/add", data);
};

export { addTripBasicInfo, addTripSummary, uploadTripFiles };
