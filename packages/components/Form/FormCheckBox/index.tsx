import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  type CheckboxProps,
} from '@mui/material';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from '../formBase.module.css';
import type { BaseFormType } from '../formBase.type';

const FormCheckbox: React.FC<BaseFormType & CheckboxProps> = ({
  name,
  label,
  rules = {},
  defaultValue = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const formRules = useMemo(() => {
    if (props?.required && !rules?.required) {
      return {
        ...rules,
        required: `${t(label)} ${t('common.required')}`,
      };
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
          className={classNames([props?.className, styles.baseFormContainer])}
        >
          <div className={styles.label}>{label}</div>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                {...props}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </div>
      )}
    />
  );
};

export default memo(FormCheckbox);
