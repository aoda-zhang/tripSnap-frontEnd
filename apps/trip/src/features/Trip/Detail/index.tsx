import { Button } from '@mui/material';
import FormTextArea from '@shared/components/Form/FormTextArea';
import classNames from 'classnames';
import { type FC, memo, useEffect } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from '../tripLayout.module.css';
import { setStep, setTripDetail } from '../tripReducer';

import routeKeys from '@/constants/routeKeys';
import { useReduxDispatch } from '@/hooks/reduxHooks';

export interface TripDetail {
  tripViews: string[];
  memory: string;
}

export interface Step2SubmitType extends TripDetail {
  tripID: string;
}

export const Step2FormMapping = {
  TripViews: 'tripViews',
  memory: 'memory',
};

const Step2: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const formProps = useForm<TripDetail>();
  const { handleSubmit } = formProps;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setStep({ step: 2 }));
  }, [dispatch]);

  const onSubmit: SubmitHandler<TripDetail> = (data) => {
    dispatch(setTripDetail(data));
    navigate(routeKeys.tripSummary);
  };
  const backToPrevious = () => {
    navigate(routeKeys.tripBasic);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        {/* 实际花费 */}
        {/* 币种 */}
        {/* 具体行程 */}
        {/* 美图分享 */}
        {/* 有何感想 */}

        <FormTextArea
          className={classNames([styles.baseForm])}
          name={Step2FormMapping.memory}
          label={
            <h3 className="font-semibold text-xl">{t('trip.tripMemories')}</h3>
          }
          required
        />
      </form>
      <div className="flex flex-col gap-4 lg:flex-row">
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
          onClick={handleSubmit(onSubmit)}
        >
          {t('common.save_continue')}
        </Button>
      </div>
    </FormProvider>
  );
};

export default memo(Step2);
