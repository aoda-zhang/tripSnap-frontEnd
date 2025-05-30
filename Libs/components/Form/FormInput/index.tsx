import { TextField, type TextFieldProps } from '@mui/material';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from '../formBase.module.css';
import type { BaseFormType, BaseTextFieldType } from '../formBase.type';

const FormInput: React.FC<
  BaseFormType & TextFieldProps & BaseTextFieldType
> = ({
  name,
  label,
  rules = {},
  defaultValue = '',
  type = 'text',
  fullWidth = true,
  ...props
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const formRules = useMemo(() => {
    if (props?.required && !rules?.required) {
      return { ...rules, required: `${t(label)} ${t('common.required')}` };
    }
    return rules;
  }, [rules, props?.required, label, t]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({ field, fieldState: { error } }) => (
        <div
          className={classNames([props?.className, styles.baseInputContainer])}
        >
          <div className={styles.label}>{label}</div>
          <TextField
            {...field}
            {...props}
            fullWidth={fullWidth}
            variant={props?.variant ?? 'standard'}
            required={props?.required}
            error={!!error}
            type={type}
            helperText={error?.message}
          />
        </div>
      )}
    />
  );
};

export default memo(FormInput);
