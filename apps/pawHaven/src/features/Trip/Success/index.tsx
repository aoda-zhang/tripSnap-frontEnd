import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import styles from '../tripLayout.module.css';

import routeKeys from '@/constants/routeKeys';

const TripSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tripID } = useParams();

  const goToHome = () => {
    navigate(routeKeys.home);
  };

  const goToHistory = () => {
    navigate(routeKeys.history);
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardContent className="text-center">
          <Box className="mb-6">
            <Typography
              variant="h4"
              className="mb-4 font-semibold text-green-600"
            >
              {t('trip.success_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mb-4">
              {t('trip.success_description')}
            </Typography>
            {tripID && (
              <Typography variant="body2" color="text.secondary">
                {t('trip.trip_id')}: {tripID}
              </Typography>
            )}
          </Box>

          <div className="flex flex-col gap-4 lg:flex-row justify-center">
            <Button
              className={styles.baseButton}
              variant="contained"
              color="primary"
              onClick={goToHome}
            >
              {t('common.go_to_home')}
            </Button>
            <Button
              className={styles.baseButton}
              variant="outlined"
              color="primary"
              onClick={goToHistory}
            >
              {t('common.history')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(TripSuccess);
