import { memo } from "react";
import { useFormContext } from "react-hook-form";
import type { BaseFormType } from "../formBase.type";
import style from "./index.module.scss";
import formBasestyle from "../formBase.module.scss";
import classNames from "classnames";

interface Option {
  value: string;
  label: string;
}

interface FormRadioProps {
  options: Option[];
}

const FormRadio: React.FC<BaseFormType & FormRadioProps> = ({ name, label, options, required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={classNames(formBasestyle.baseInputContainer, {
        [formBasestyle.error]: !!errors[name],
      })}
    >
      <p className={formBasestyle.label}>{label}</p>
      {options.map((option) => (
        <label key={option.value} className={style.radioLabel}>
          <input
            type="radio"
            value={option.value}
            {...register(name, required ? { required: "This field is required" } : {})}
            className={classNames(style.radioInput, {
              [style.radioError]: !!errors[name],
            })}
          />
          {option.label}
        </label>
      ))}
      {errors[name] && <span className={formBasestyle.errorMessage}>{errors[name]?.message?.toString()}</span>}
    </div>
  );
};

export default memo(FormRadio);
