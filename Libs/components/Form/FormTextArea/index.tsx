import {
  FormControl,
  FormHelperText,
  TextareaAutosize,
  type TextareaAutosizeProps,
} from '@mui/material';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from '../formBase.module.css';
import type { BaseFormType } from '../formBase.type';

const FormTextArea: React.FC<BaseFormType & TextareaAutosizeProps> = ({
  name,
  label,
  rules = {},
  defaultValue = '',
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
      // @ts-ignore
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({
        field: { ref: fieldRef, value, ...fieldProps },
        fieldState: { error },
      }) => (
        <FormControl
          className={classNames([props?.className, styles.baseInputContainer])}
          error={!!error}
          fullWidth={fullWidth}
        >
          <div className={styles.label}>{label}</div>
          <TextareaAutosize
            {...fieldProps}
            value={value ?? ''}
            ref={fieldRef}
            maxRows={props?.minRows ?? 10}
            minRows={props?.minRows ?? 5}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default memo(FormTextArea);
