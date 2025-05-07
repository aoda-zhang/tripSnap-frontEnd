import FormDate from "@/shared/components/Form/FormDate";
import FormInput from "@/shared/components/Form/FormInput";
import FormSelect from "@/shared/components/Form/FormSelect";
import { Button } from "@mui/material";
import classNames from "classnames";
import { type FC, memo } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import TripStore from "../store";
import FormRadio from "@/shared/components/Form/FormRadio";
import TransportRadio from "@/components/TransportRadio";
export interface Step1FormType {
  tripName: string;
  departureDate: [Date | null, Date | null];
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

  const onSubmit: SubmitHandler<Step1FormType> = (data) => {
    console.log(data);
    setStep(2);
    navigate("/trip/step2");
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
        <FormInput className={styles.baseForm} name={Step1FormMapping.Participants} label="几个人" required={true} />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Participants}
          label="主要的交通方式"
          required={true}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Const}
          label={t("trip.cost")}
          required={true}
          type="number"
          defaultPrefix={true}
        />
        <TransportRadio />
      </form>
      <Button
        className={classNames([styles.buttons, styles.baseButton])}
        type="submit"
        variant="contained"
        color="primary"
        onClick={formProps?.handleSubmit(onSubmit)}
      >
        {t("common.save_continue")}
      </Button>
    </FormProvider>
  );
};

export default memo(Step1);
