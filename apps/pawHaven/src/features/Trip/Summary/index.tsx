import { Button } from '@mui/material';
import Phase from '@shared/components/Phase';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAddTrip } from '../apis/queries';
import { Step1FormMapping, TripBasic } from '../Basic/validation';
import styles from '../tripLayout.module.css';
import { setStep, useTripState } from '../tripReducer';

import routeKeys from '@/constants/routeKeys';
import { useReduxDispatch } from '@/hooks/reduxHooks';

const Step3 = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();
  const { tripInfo, tripImages } = useTripState();
  const { mutate: submitTrip, isLoading } = useAddTrip();

  useEffect(() => {
    dispatch(setStep({ step: 3 }));
  }, [dispatch]);

  const handleSubmit = () => {
    const submitData = {
      tripBasic: tripInfo.tripBasic,
      tripDetail: {
        ...(tripInfo?.tripDetail ?? {}),
        tripImages,
      },
    };
    submitTrip(submitData);
  };
  const basicInfo = useMemo(() => {
    const tripBasic = tripInfo?.tripBasic as TripBasic;
    if (!tripBasic || Object.keys(tripBasic).length === 0) {
      return [];
    }
    return [
      {
        label: t('trip.trip_name'),
        value: tripBasic[Step1FormMapping.TripName],
      },
      {
        label: t('trip.start_date'),
        value: tripBasic[Step1FormMapping.Participants],
      },
      {
        label: t('trip.end_date'),
        value: tripBasic[Step1FormMapping.Participants],
      },
      {
        label: t('trip.destination'),
        value: tripBasic[Step1FormMapping.Destination],
      },
    ];
  }, [t, tripInfo.tripBasic]);
  const detailInfo = useMemo(() => {
    const tripBasic = tripInfo?.tripBasic as TripBasic;
    if (!tripBasic || Object.keys(tripBasic).length === 0) {
      return [];
    }
    return [
      {
        label: t('trip.trip_name'),
        value: tripBasic[Step1FormMapping.TripName],
      },
      {
        label: t('trip.start_date'),
        value: tripBasic[Step1FormMapping.Participants],
      },
      {
        label: t('trip.end_date'),
        value: tripBasic[Step1FormMapping.Participants],
      },
      {
        label: t('trip.destination'),
        value: tripBasic[Step1FormMapping.Destination],
      },
    ];
  }, [t, tripInfo.tripBasic]);

  const backToPrevious = () => {
    navigate(routeKeys.tripDetail);
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl mb-4"> {t('trip.summary_description')}</h2>
      <Phase title={t('trip.step1')} sections={basicInfo} />
      <Phase title={t('trip.step2')} sections={detailInfo} />

      <div className="flex flex-col gap-4 lg:flex-row mt-8">
        <Button
          className={styles.baseButton}
          variant="outlined"
          color="primary"
          onClick={backToPrevious}
        >
          {t('common.previous')}
        </Button>
        <Button
          className={styles.baseButton}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          {t('trip.confirm_submit')}
        </Button>
      </div>
    </div>
  );
};

export default memo(Step3);
