import { FormControl, FormHelperText, MenuItem, Select, type SelectProps } from "@mui/material";
import classNames from "classnames";
import React, { memo, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "../formBase.module.scss";
import type { BaseFormType, BaseSelectType } from "../formBase.type";

const FormSelect: React.FC<BaseFormType & BaseSelectType & SelectProps> = ({
  name,
  label,
  options,
  control,
  rules = {},
  defaultValue = "",
  fullWidth = true,
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
        <FormControl
          className={classNames([props?.className, styles.baseInputContainer])}
          error={!!error}
          fullWidth={fullWidth}
        >
          <div className={styles.label}>{label}</div>
          <Select {...field} {...props} variant={props?.variant ?? "standard"} required={props?.required}>
            {options?.map((item) => (
              <MenuItem key={item?.value} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default memo(FormSelect);
