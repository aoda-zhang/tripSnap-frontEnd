import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAddTrip } from '../apis/queries';
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
        ...tripInfo.tripDetail,
        tripImages,
      },
    };
    submitTrip(submitData);
  };

  const backToPrevious = () => {
    navigate(routeKeys.tripDetail);
  };

  const renderBasicInfo = () => {
    const basic = tripInfo.tripBasic as any;
    if (!basic || Object.keys(basic).length === 0) {
      return (
        <Typography color="text.secondary">{t('common.no_data')}</Typography>
      );
    }

    return (
      <Box className="space-y-3">
        <Box className="flex justify-between items-center">
          <Typography variant="body2" color="text.secondary">
            {t('trip.trip_name')}:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {basic.tripName}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="body2" color="text.secondary">
            {t('trip.destination')}:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {basic.destination}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="body2" color="text.secondary">
            {t('trip.numOfTravelers')}:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {basic.participants}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="body2" color="text.secondary">
            {t('trip.transport')}:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {basic.transport} {basic.transportNo && `(${basic.transportNo})`}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderDetailInfo = () => {
    const detail = tripInfo.tripDetail as any;
    if (!detail || Object.keys(detail).length === 0) {
      return (
        <Typography color="text.secondary">{t('common.no_data')}</Typography>
      );
    }

    return (
      <Box className="space-y-3">
        <Box>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {t('trip.tripMemories')}:
          </Typography>
          <Typography variant="body1" className="bg-gray-50 p-3 rounded">
            {detail.memory || t('common.no_data')}
          </Typography>
        </Box>
        {tripImages && tripImages.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              {t('trip.tripImages')}:
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {tripImages.map((imageId) => (
                <Chip
                  key={imageId}
                  label={`${t('trip.image')} ${imageId}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className="mb-6 font-semibold">
        {t('trip.summary_title')}
      </Typography>

      <Typography variant="body1" color="text.secondary" className="mb-6">
        {t('trip.summary_description')}
      </Typography>

      <div className="space-y-6">
        {/* Basic Information Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 font-medium">
              {t('trip.basic_info')}
            </Typography>
            {renderBasicInfo()}
          </CardContent>
        </Card>

        {/* Detail Information Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 font-medium">
              {t('trip.detail_info')}
            </Typography>
            {renderDetailInfo()}
          </CardContent>
        </Card>
      </div>

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
