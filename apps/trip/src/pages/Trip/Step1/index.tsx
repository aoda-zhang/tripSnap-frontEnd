import FormDate from "@/shared/components/Form/FormDate";
import FormInput from "@/shared/components/Form/FormInput";
import { Button } from "@mui/material";
import classNames from "classnames";
import { type FC, memo } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";
import TransportRadio from "@/components/TransportRadio";
import { useMutation } from "react-query";
import { addTripBasicInfo } from "../apis";
export interface Step1FormType {
  tripName: string;
  departureDate: [Date | null, Date | null];
  returnDate: string;
  destination: string;
  participants: string;
  transportation: string;
  transport: string;
  transportNo: string;
}
export enum Step1FormMapping {
  TripName = "tripName",
  DepartureDate = "departureDate",
  ReturnDate = "returnDate",
  Destination = "destination",
  Participants = "participants",
  Transportation = "transportation",
  Const = "const",
}

const Step1: FC = () => {
  const { t } = useTranslation();
  const formProps = useForm<Step1FormType>({
    defaultValues: {
      departureDate: [null, null],
    },
  });
  const { setStep } = TripStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: addTripBasicInfo,
    onSuccess: (data) => {
      setStep(2);
      navigate(`/trip/step2/${data?.tripId}`);
    },
  });

  const onSubmit: SubmitHandler<Step1FormType> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Destination}
          label={t("trip.destination")}
          required={true}
        />
        <FormDate
          className={styles.baseForm}
          name={Step1FormMapping.DepartureDate}
          label={t("trip.departure_return_date")}
          required={true}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Participants}
          label={t("trip.numOfTravelers")}
          type="number"
          required={true}
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
        {t("common.save_continue")}
      </Button>
    </FormProvider>
  );
};

export default memo(Step1);
