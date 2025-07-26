import { Button } from '@mui/material';
import FileUpload from '@shared/components/FileUpload';
import FormTextArea from '@shared/components/Form/FormTextArea';
import classNames from 'classnames';
import { type FC, memo, useEffect } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useAddTripDetail, useUploadTripImgs } from '../apis/queries';
import styles from '../tripLayout.module.css';
import { setStep } from '../tripReducer';

import { useReduxDispatch } from '@/hooks/reduxHooks';

export interface Step2FormType {
  tripViews: string[];
  memory: string;
}

export interface Step2SubmitType extends Step2FormType {
  tripID: string;
}

export const Step2FormMapping = {
  TripViews: 'tripViews',
  memory: 'memory',
};

const Step2: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { tripID } = useParams<{ tripID: string }>();
  const formProps = useForm<Step2FormType>();
  const { handleSubmit } = formProps;
  const { mutate: addTripDetail, isLoading } = useAddTripDetail();
  const navigate = useNavigate();

  const { mutate: uploadTripImgs } = useUploadTripImgs();

  useEffect(() => {
    dispatch(setStep({ step: 2 }));
  }, [dispatch]);

  const onSubmit: SubmitHandler<Step2FormType> = (data) => {
    addTripDetail({ ...data, tripID: tripID ?? '' } as Step2SubmitType);
  };
  const backToPrevious = () => {
    navigate('/trip/step1');
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <h3 className="text-xl font-semibold mb-10">{t('trip.tripViews')}</h3>
        <FileUpload
          className={styles.baseButton}
          onUpload={(event) => {
            uploadTripImgs(event);
          }}
        />
        <FormTextArea
          className={classNames([styles.baseForm])}
          name={Step2FormMapping.memory}
          label={
            <h3 className="mt-10 font-semibold text-xl">
              {t('trip.tripMemories')}
            </h3>
          }
          required
        />
      </form>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Button
          className={styles.baseButton}
          variant="contained"
          color="primary"
          onClick={backToPrevious}
        >
          {t('common.previous')}
        </Button>
        <Button
          loading={isLoading}
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
