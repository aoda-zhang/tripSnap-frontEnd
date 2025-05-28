import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import getCurrencyCode from '@shared/utils/getCurrencyCode';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from '../formBase.module.css';
import type { BaseFormType, BaseTextFieldType } from '../formBase.type';

import globalStore from '@/store/globalStore';

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
  const locale = globalStore((state) => state?.locale);
  const formRules = useMemo(() => {
    if (props?.required && !rules?.required) {
      return { ...rules, required: `${t(label)} ${t('common.required')}` };
    }
    return rules;
  }, [rules, props?.required, label, t]);

  const { defaultPrefix, defaultSuffix, prefix, suffix, ...restProps } = props;

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
            {...restProps}
            fullWidth={fullWidth}
            variant={restProps?.variant ?? 'standard'}
            required={restProps?.required}
            error={!!error}
            type={type}
            helperText={error?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {defaultPrefix ? getCurrencyCode(locale) : prefix}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {defaultSuffix ? getCurrencyCode(locale) : suffix}
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
