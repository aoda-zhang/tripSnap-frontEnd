import FileUpload from "@/shared/components/FileUpload";
import FormTextArea from "@/shared/components/Form/FormTextArea";
import { Button } from "@mui/material";
import { type FC, memo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";

export interface Step3FormType {
  tripName: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  participants: string;
  transportation: string;
}

export const Step3FormMapping = {
  TripViews: "tripViews",
  Summary: "summary",
};

const Step3: FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Step3FormType>();
  const { setStep } = TripStore();
  const navagite = useNavigate();

  const onSubmit: SubmitHandler<Step3FormType> = (data) => {
    console.log(data);
  };
  const backToPrevious = () => {
    setStep(2);
    navagite("/trip/step2");
  };
  const handleUpload = (files: File[]) => {
    console.log("files-----------", files);
  };
  return (
    <>
      <form className={styles.record}>
        <FileUpload
          className={styles.baseButton}
          onUpload={(event) => {
            handleUpload(event);
          }}
        />
        <FormTextArea
          className={styles.baseForm}
          name={Step3FormMapping.Summary}
          label={t(`trip.${Step3FormMapping.Summary}`)}
          required={true}
          control={control}
        />
      </form>
      <div className={styles.buttons}>
        <Button className={styles.baseButton} variant="contained" color="primary" onClick={backToPrevious}>
          {t("common.previous")}
        </Button>
        <Button className={styles.baseButton} variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          {t("common.save_continue")}
        </Button>
      </div>
    </>
  );
};

export default memo(Step3);
