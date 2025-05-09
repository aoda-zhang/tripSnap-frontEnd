import { useWatch, useFormContext } from "react-hook-form";
import { memo } from "react";
import FormRadio from "@/shared/components/Form/FormRadio";
import FormInput from "@/shared/components/Form/FormInput";
import { useTranslation } from "react-i18next";
const TransportationOptions = {
  car: "Car",
  plane: "Plane",
  train: "Train",
};

const TransportRadio = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const transport = useWatch({ control, name: "transport" });
  const TransportSwitch = () => {
    switch (transport) {
      case TransportationOptions.car:
        return <FormInput name="transportNo" label="Car Plate Number" />;
      case TransportationOptions.plane:
        return <FormInput name="transportNo" label="Flight Number" />;
      case TransportationOptions.train:
        return <FormInput name="transportNo" label="Train Number" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "50vw" }}>
      <FormRadio
        required={true}
        name="transport"
        label={t("trip.transportation")}
        options={[
          { value: TransportationOptions.car, label: t("trip.car") },
          { value: TransportationOptions.plane, label: t("trip.plane") },
          { value: TransportationOptions.train, label: t("trip.train") },
        ]}
      />
      <TransportSwitch />
    </div>
  );
};

export default memo(TransportRadio);
