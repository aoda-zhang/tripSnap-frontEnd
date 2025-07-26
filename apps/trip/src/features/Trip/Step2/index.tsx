import { Button } from '@mui/material';
import FileUpload from '@shared/components/FileUpload';
import FormTextArea from '@shared/components/Form/FormTextArea';
import { type FC, memo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useAddTripDetail, useUploadTripImgs } from '../apis/queries';
import styles from '../tripLayout.module.css';
import { setStep } from '../tripSlice';

export interface Step2FormType {
  tripViews: string[];
  summary: string;
}

export interface Step2SubmitType {
  tripViews: string[];
  summary: string;
  tripID: string;
}

export const Step2FormMapping = {
  TripViews: 'tripViews',
  Summary: 'summary',
};

const Step2: FC = () => {
  const { t } = useTranslation();
  const { tripID } = useParams<{ tripID: string }>();
  const formProps = useForm<Step2FormType>();
  const { handleSubmit } = formProps;
  const { mutate: addTripDetail, isLoading } = useAddTripDetail();
  const navigate = useNavigate();

  const { mutate: uploadTripImgs } = useUploadTripImgs();

  const onSubmit: SubmitHandler<Step2FormType> = (data) => {
    addTripDetail({ ...data, tripID: tripID ?? '' } as Step2SubmitType);
  };
  const backToPrevious = () => {
    setStep({ step: 1 });
    navigate('/trip/step1');
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FileUpload
          className={styles.baseButton}
          onUpload={(event) => {
            uploadTripImgs(event);
          }}
        />
        <FormTextArea
          className={styles.baseForm}
          name={Step2FormMapping.Summary}
          label={t(`trip.${Step2FormMapping.Summary}`)}
          required
        />
      </form>
      <div className={styles.buttons}>
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
