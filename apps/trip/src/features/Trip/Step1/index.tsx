import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import FormInput from '@shared/components/Form/FormInput';
import classNames from 'classnames';
import { memo, useEffect, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddBasicTrip } from '../apis/queries';
import styles from '../tripLayout.module.css';
import { setStep, useTripState } from '../tripReducer';

import { getStep1schema, Step1FormMapping, Step1FormType } from './validation';

import TransportRadio from '@/components/TransportRadio';
import { useReduxDispatch } from '@/hooks/reduxHooks';

const Step1 = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const Step1schema = useMemo(() => getStep1schema(t), [t]);
  const { tripStep1Data } = useTripState();
  const formProps = useForm<Step1FormType>({
    defaultValues: tripStep1Data,
    resolver: zodResolver(Step1schema),
  });
  const { mutate: addTripStep1, isLoading } = useAddBasicTrip();

  useEffect(() => {
    dispatch(setStep({ step: 1 }));
  }, [dispatch]);

  const onSubmit: SubmitHandler<Step1FormType> = (data) => {
    addTripStep1(data);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.TripName}
          label={t('trip.trip_name')}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Destination}
          label={t('trip.destination')}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Participants}
          label={t('trip.numOfTravelers')}
        />
        <TransportRadio />
      </form>
      <Button
        className={classNames([styles.buttons, styles.baseButton])}
        type="submit"
        variant="contained"
        color="primary"
        loading={isLoading}
        onClick={formProps?.handleSubmit(onSubmit)}
      >
        {t('common.save_continue')}
      </Button>
    </FormProvider>
  );
};

export default memo(Step1);
