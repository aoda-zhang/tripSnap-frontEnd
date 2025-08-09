import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import styles from './tripLayout.module.css';
import { useTripState } from './tripReducer';

const steps = ['trip.step1', 'trip.step2', 'trip.step3'];

const Trip: FC = () => {
  const { t } = useTranslation();
  const currentStep = useTripState().tripStep;

  return (
    <div className={styles.trip}>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={currentStep - 1}
          alternativeLabel
          classes={styles.stepper}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </Box>
      <p className={styles.caption}>{t(`trip.step${currentStep}`)}</p>
      <Outlet />
    </div>
  );
};
export default Trip;
