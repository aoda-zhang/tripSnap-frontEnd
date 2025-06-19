import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useTripActions } from '../store';

import * as TripAPI from './api';

export const useAddTrip = () => {
  const navigate = useNavigate();
  const { setStep } = useTripActions();

  return useMutation(TripAPI.addTripBasicInfo, {
    onSuccess: (data) => {
      setStep(2);
      navigate(`/trip/step2/${data?.tripId}`);
    },
  });
};

export const useGetTrip = () => {
  const navigate = useNavigate();
  const { setStep } = useTripActions();

  return useMutation(TripAPI.addTripBasicInfo, {
    onSuccess: (data) => {
      setStep(2);
      navigate(`/trip/step2/${data?.tripId}`);
    },
  });
};
