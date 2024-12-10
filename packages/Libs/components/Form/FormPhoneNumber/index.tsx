import getCountryCode from "@/shared/utils/getCountryCode";
import globalStore from "@/store/globalStore";
import { FormControl, FormHelperText } from "@mui/material";
import classNames from "classnames";
import { MuiTelInput, type MuiTelInputProps } from "mui-tel-input";
import React, { memo, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "../formBase.module.scss";
import type { BaseFormType } from "../formBase.type";

const FormPhoneNumber: React.FC<BaseFormType & MuiTelInputProps> = ({
  name,
  label,
  control,
  rules = {},
  defaultValue = "",
  fullWidth = true,
  ...props
}) => {
  const { t } = useTranslation();
  const locale = globalStore((state) => state?.locale);
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
      render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState: { invalid, error } }) => (
        <FormControl
          className={classNames([props?.className, styles.baseInputContainer])}
          error={!!error}
          fullWidth={fullWidth}
        >
          <div className={styles.label}>{label}</div>
          <MuiTelInput
            {...fieldProps}
            value={value ?? ""}
            inputRef={fieldRef}
            variant={props?.variant ?? "standard"}
            error={invalid}
            defaultCountry={getCountryCode(locale)}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default memo(FormPhoneNumber);
