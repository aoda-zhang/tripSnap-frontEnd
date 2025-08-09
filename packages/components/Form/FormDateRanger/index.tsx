import { FormControl, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  SingleInputDateRangeField,
  SingleInputDateRangeFieldProps,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { FC, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from '../formBase.module.css';
import { BaseFormType } from '../formBase.type';

type FormSingleDateRangerProps = BaseFormType &
  Omit<SingleInputDateRangeFieldProps<Dayjs>, 'value' | 'onChange'> & {
    fullWidth?: boolean;
  };

const FormSingleDateRanger: FC<FormSingleDateRangerProps> = ({
  name,
  label,
  rules = {},
  defaultValue = [null, null],
  fullWidth = true,
  ...props
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const formRules = useMemo(() => {
    if (props?.required && !rules?.required) {
      return {
        ...rules,
        required: `${t(label ?? 'This Field')} ${t('common.required')}`,
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
          <FormControl fullWidth={fullWidth} error={!!error}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputDateRangeField
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    variant: props?.variant ?? 'standard',
                    required: props?.required,
                    fullWidth,
                  },
                }}
              />
            </LocalizationProvider>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </div>
      )}
    />
  );
};

export default FormSingleDateRanger;
