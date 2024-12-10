import getCurrencyCode from "@/shared/utils/getCurrencyCode";
import globalStore from "@/store/globalStore";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import classNames from "classnames";
import React, { memo, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "../formBase.module.scss";
import type { BaseFormType, BaseTextFieldType } from "../formBase.type";

const FormInput: React.FC<BaseFormType & TextFieldProps & BaseTextFieldType> = ({
  name,
  label,
  control,
  rules = {},
  defaultValue = "",
  type = "text",
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
      render={({ field, fieldState: { error } }) => (
        <div className={classNames([props?.className, styles.baseInputContainer])}>
          <div className={styles.label}>{label}</div>
          <TextField
            {...field}
            {...props}
            fullWidth={fullWidth}
            variant={props?.variant ?? "standard"}
            required={props?.required}
            error={!!error}
            type={type}
            helperText={error?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {props?.defaultPrefix ? getCurrencyCode(locale) : props?.prefix}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {props?.defaultSuffix ? getCurrencyCode(locale) : props?.suffix}
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
    />
  );
};

export default memo(FormInput);
