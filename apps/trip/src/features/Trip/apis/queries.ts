import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { setTripImageIDs } from '../tripReducer';

import * as TripAPI from './api';

import { useReduxDispatch } from '@/hooks/reduxHooks';

export const useAddTrip = () => {
  const navigate = useNavigate();
  return useMutation(TripAPI.submitTrip, {
    onSuccess: (response) => {
      navigate(`/trip/success/${response?.tripID}`);
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
