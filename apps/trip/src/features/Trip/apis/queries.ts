import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  setTripImageIDs,
  setTripStep1Data,
  setTripStep2Data,
} from '../tripReducer';

import * as TripAPI from './api';

import { useReduxDispatch } from '@/hooks/reduxHooks';

export const useAddBasicTrip = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  return useMutation(TripAPI.addTripBasicInfo, {
    onSuccess: (response, basicTipData) => {
      dispatch(setTripStep1Data({ tripStep1Data: basicTipData }));
      navigate(`/trip/step2/${response?.tripId}`);
    },
  });
};

export const useAddTripDetail = () => {
  const dispatch = useReduxDispatch();
  return useMutation(TripAPI.addTripSummary, {
    onSuccess: (response, tripDetail) => {
      dispatch(setTripStep2Data({ tripStep2Data: tripDetail }));
    },
  });
};

export const useUploadTripImgs = () => {
  const dispatch = useReduxDispatch();
  return useMutation(TripAPI.uploadTripFiles, {
    onSuccess: (response) => {
      dispatch(setTripImageIDs({ tripImages: response?.fileIds }));
    },
  });
};
