import { FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  SingleInputDateRangeField,
  type SingleInputDateRangeFieldProps,
} from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import classNames from "classnames";
import type { Dayjs } from "dayjs";
import React, { memo, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "../formBase.module.scss";
import type { BaseFormType } from "../formBase.type";

const FormDate: React.FC<BaseFormType & SingleInputDateRangeFieldProps<Dayjs>> = ({
  name,
  label,
  control,
  rules = {},
  defaultValue = "",
  ...props
}) => {
  const { t } = useTranslation();
  const formRules = useMemo(() => {
    if (props?.required && !rules?.required) {
      return { ...rules, required: `${t(label)} ${t("common.required")}` };
    }
    return rules;
  }, [rules, props?.required, label, t]);
  return (
    <Controller
      name={name}
      // @ts-ignore
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({ field, fieldState: { error } }) => (
        <div className={classNames([props?.className, styles.baseInputContainer])}>
          <div className={styles.label}>{label}</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SingleInputDateRangeField
              {...field}
              {...props}
              variant={props?.variant ?? "standard"}
              format={props?.format ?? "YYYY/MM/DD"}
            />
          </LocalizationProvider>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </div>
      )}
    />
  );
};

export default memo(FormDate);
