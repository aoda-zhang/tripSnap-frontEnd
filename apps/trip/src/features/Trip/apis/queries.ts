import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  setStep,
  setTripImageIDs,
  setTripStep1Data,
  setTripStep2Data,
} from '../tripSlice';

import * as TripAPI from './api';

export const useAddBasicTrip = () => {
  const navigate = useNavigate();
  return useMutation(TripAPI.addTripBasicInfo, {
    onSuccess: (response, basicTipData) => {
      setStep({ step: 2 });
      setTripStep1Data({ tripStep1Data: basicTipData });
      navigate(`/trip/step2/${response?.tripId}`);
    },
  });
};

export const useAddTripDetail = () => {
  return useMutation(TripAPI.addTripSummary, {
    onSuccess: (response, tripDetail) => {
      setTripStep2Data({ tripStep2Data: tripDetail });
    },
  });
};

export const useUploadTripImgs = () => {
  return useMutation(TripAPI.uploadTripFiles, {
    onSuccess: (response) => {
      setTripImageIDs({ tripImages: response?.fileIds });
    },
  });
};
