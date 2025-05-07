import { useWatch, useFormContext } from "react-hook-form";
import { memo } from "react";
import FormRadio from "@/shared/components/Form/FormRadio";
import FormInput from "@/shared/components/Form/FormInput";
const TransportationOptions = {
  car: "Car",
  plane: "Plane",
  train: "Train",
};

const TransportRadio = () => {
  const { control } = useFormContext();
  const transport = useWatch({ control, name: "transport" });
  const TransportSwitch = () => {
    switch (transport) {
      case TransportationOptions.car:
        return <FormInput name="carPlate" label="Car Plate Number" />;
      case TransportationOptions.plane:
        return <FormInput name="flightNumber" label="Flight Number" />;
      case TransportationOptions.train:
        return <FormInput name="trainNumber" label="Train Number" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "50vw" }}>
      <FormRadio
        required={true}
        name="transport"
        label="主要交通方式"
        options={[
          { value: TransportationOptions.car, label: "Car" },
          { value: TransportationOptions.plane, label: "Plane" },
          { value: TransportationOptions.train, label: "Train" },
        ]}
      />
      <TransportSwitch />
    </div>
  );
};

export default memo(TransportRadio);
