import { Button } from '@mui/material';
import { type FC, memo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import useTripStore from '../store';
import styles from '../tripLayout.module.scss';

import { TripAPI } from '@/apis';
import FileUpload from '@/shared/components/FileUpload';
import FormTextArea from '@/shared/components/Form/FormTextArea';
import storageTool from '@/shared/utils/storage';

export interface Step2FormType {
  tripViews: string[];
  summary: string;
  tripId: string;
}

export const Step2FormMapping = {
  TripViews: 'tripViews',
  Summary: 'summary',
};

const Step3: FC = () => {
  const { t } = useTranslation();
  const { tripId } = useParams<{ tripId: string }>();
  const formProps = useForm<Step2FormType>();
  const { handleSubmit } = formProps;
  const { setStep } = useTripStore();
  const navagite = useNavigate();

  const { mutate } = useMutation({
    mutationFn: TripAPI.addTripSummary,
    onSuccess: () => {
      navagite(`/trip/${tripId}`);
    },
  });

  const uploadTripFilesMutation = useMutation({
    mutationFn: TripAPI.uploadTripFiles,
    onSuccess: (data) => {
      // 提示 文件已上传成功
      storageTool.set('tripFiles', data?.fileIds);
    },
  });

  const onSubmit: SubmitHandler<Step2FormType> = (data) => {
    const tripViews = storageTool.get('tripFiles');
    if (!tripId) {
      console.error('tripId is undefined');
      return;
    }
    mutate({ ...data, tripId, tripViews });
  };
  const backToPrevious = () => {
    setStep(1);
    navagite('/trip/step1');
  };
  const handleUpload = (files: File[]) => {
    uploadTripFilesMutation.mutate(files);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FileUpload
          className={styles.baseButton}
          onUpload={(event) => {
            handleUpload(event);
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

export default memo(Step3);
