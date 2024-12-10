import FormInput from "@/shared/components/Form/FormInput";
import FormPhoneNumber from "@/shared/components/Form/FormPhoneNumber";
import { Button } from "@mui/material";
import classNames from "classnames";
import { type FC, memo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";
export interface Step2FormType {
  tripName: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  participants: string;
  transportation: string;
}
export const Step2FormMapping = {
  HotalName: "hotalName",
  HotalContact: "hotalContact",
  Const: "const",
  Destination: "destination",
};

const Step2: FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Step2FormType>();
  const { setStep, tripStep } = TripStore();
  const navagite = useNavigate();

  const onSubmit: SubmitHandler<Step2FormType> = (data) => {
    console.log(data);
    setStep(tripStep + 1);
    navagite(`/trip/step${tripStep + 1}`);
  };
  const backToPrevious = () => {
    setStep(tripStep - 1);
    navagite(`/trip/step${tripStep - 1}`);
  };
  return (
    <>
      <form className={styles.record}>
        <FormInput
          className={styles.baseForm}
          name={Step2FormMapping.HotalName}
          label={t("trip.hotel_name")}
          required={true}
          control={control}
        />
        <FormPhoneNumber
          className={classNames([styles.baseForm, styles.phoneNumber])}
          name={Step2FormMapping.HotalContact}
          label={t("trip.hotel_contact")}
          required={true}
          control={control}
        />
        <FormInput
          className={styles.baseForm}
          name={Step2FormMapping.Const}
          label={t("trip.cost")}
          required={true}
          control={control}
          type="number"
          defaultPrefix={true}
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

export default memo(Step2);
