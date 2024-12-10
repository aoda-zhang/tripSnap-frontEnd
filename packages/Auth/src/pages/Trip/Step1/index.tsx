import FormDate from "@/shared/components/Form/FormDate";
import FormInput from "@/shared/components/Form/FormInput";
import FormSelect from "@/shared/components/Form/FormSelect";
import { Button } from "@mui/material";
import classNames from "classnames";
import { type FC, memo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";
export interface Step1FormType {
  tripName: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  participants: string;
  transportation: string;
}
export enum Step1FormMapping {
  TripName = "tripName",
  DepartureDate = "departureDate",
  ReturnDate = "returnDate",
  Destination = "destination",
  Participants = "participants",
  Transportation = "transportation",
}

const Step1: FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Step1FormType>();
  const { transportationOptions, setStep } = TripStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Step1FormType> = (data) => {
    console.log(data);
    setStep(2);
    navigate("/trip/step2");
  };
  return (
    <>
      <form className={styles.record}>
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.TripName}
          label={t("trip.trip_name")}
          required={true}
          control={control}
        />
        {/* <FormDate
          className={styles.baseForm}
          name={Step1FormMapping.DepartureDate}
          label={t("trip.departure_return_date")}
          required={true}
          control={control}
        /> */}

        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Destination}
          label={t("trip.destination")}
          required={true}
          control={control}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Participants}
          label={t("trip.participants")}
          required={true}
          control={control}
        />
        <FormSelect
          options={transportationOptions}
          // multiple
          className={styles.baseForm}
          name={Step1FormMapping.Transportation}
          label={t("trip.transportation")}
          required={true}
          control={control}
        />
      </form>
      <Button
        className={classNames([styles.buttons, styles.baseButton])}
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      >
        {t("common.save_continue")}
      </Button>
    </>
  );
};

export default memo(Step1);
