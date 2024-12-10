export interface BaseFormType {
  name: string;
  label: string;
  control: unknown;
  rules?: Record<string, unknown>;
  defaultValue?: string | number;
  type?: string;
  fullWidth?: boolean;
  className?: string | string[];
  required?: boolean;
}

export interface BaseSelectType {
  options: { label: string; value: string | number }[];
}

export interface BaseTextFieldType {
  prefix?: string;
  defaultPrefix?: boolean;
  suffix?: string;
  defaultSuffix?: boolean;
}
