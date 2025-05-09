import FileUpload from "@/shared/components/FileUpload";
import FormTextArea from "@/shared/components/Form/FormTextArea";
import { Button } from "@mui/material";
import { type FC, memo } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";
import storageTool from "@/shared/utils/storage";
import { useMutation } from "react-query";
import { addTripSummary, uploadTripFiles } from "../apis";

export interface Step2FormType {
  tripViews: string[];
  summary: string;
  tripId: string;
}

export const Step2FormMapping = {
  TripViews: "tripViews",
  Summary: "summary",
};

const Step3: FC = () => {
  const { t } = useTranslation();
  const { tripId } = useParams();
  const formProps = useForm<Step2FormType>();
  const { handleSubmit } = formProps;
  const { setStep } = TripStore();
  const navagite = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addTripSummary,
    onSuccess: data => {
      console.log("success", data);
      // 成功后跳转到 trip 成功页面
      navagite(`/trip/${tripId}`);
    },
  });

  const uploadTripFilesMutation = useMutation({
    mutationFn: uploadTripFiles,
    onSuccess: data => {
      // 提示 文件已上传成功
      storageTool.set("tripFiles", data?.fileIds);
    },
  });

  const onSubmit: SubmitHandler<Step2FormType> = data => {
    console.log(data);
    const tripViews = storageTool.get("tripFiles");
    mutate({ ...data, tripId, tripViews });
  };
  const backToPrevious = () => {
    setStep(1);
    navagite("/trip/step1");
  };
  const handleUpload = (files: File[]) => {
    uploadTripFilesMutation.mutate(files);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FileUpload
          className={styles.baseButton}
          onUpload={event => {
            handleUpload(event);
          }}
        />
        <FormTextArea
          className={styles.baseForm}
          name={Step2FormMapping.Summary}
          label={t(`trip.${Step2FormMapping.Summary}`)}
          required={true}
        />
      </form>
      <div className={styles.buttons}>
        <Button
          className={styles.baseButton}
          variant="contained"
          color="primary"
          onClick={backToPrevious}
        >
          {t("common.previous")}
        </Button>
        <Button
          className={styles.baseButton}
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {t("common.save_continue")}
        </Button>
      </div>
    </FormProvider>
  );
};

export default memo(Step3);
