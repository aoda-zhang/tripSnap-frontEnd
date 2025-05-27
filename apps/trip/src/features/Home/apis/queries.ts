import { useQuery } from 'react-query';

import * as HomeAPI from './api';

export const HomeQueryKeys = {
  GET_DEFAULT_TRIP_VIEW: 'GET_DEFAULT_TRIP_VIEW',
};

export const useDefaultViews = () => {
  return useQuery({
    queryKey: [HomeQueryKeys.GET_DEFAULT_TRIP_VIEW],
    queryFn: HomeAPI.getDefaultTripView,
  });
};
