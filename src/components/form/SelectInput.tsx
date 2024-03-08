import * as React from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

import clsxm from "@/libs/clxsm";
import RequiredLabel from "./RequiredLabel";

export type SelectInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  readOnly?: boolean;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<"select">;

export default function SelectInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  readOnly = false,
  defaultValue = "",
  placeholder = "",
  children,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const error = get(errors, id);
  const value = watch(id);

  return (
    <div className="w-full space-y-1.5 rounded-md">
      {label && (
        <label className="text-lg">
          {label} {validation?.required && <RequiredLabel />}
        </label>
      )}

      <div className="relative">
        <select
          {...register(id, validation)}
          id={id}
          name={id}
          defaultValue={defaultValue}
          disabled={readOnly}
          className={clsxm(
            "w-full appearance-none  rounded-md border px-3 py-2",
            "ring-1  ring-[#808080] ",
            "focus:outline-1 focus:outline-[#76E8FF] focus:ring-inset",
            "bg-neutral-10 text-sm",
            "hover:ring-1 hover:ring-inset hover:ring-[#000]",
            "placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540]",
            readOnly && "cursor-not-allowed",
            error &&
              "bg-red-100 border-none ring-2 ring-inset ring-red-500 placeholder:text-[#092540] focus:ring-red-500 focus:outline-red-400",
            value && "ring-primary-info-active focus:ring-primary-info-active",
            className
          )}
          aria-describedby={id}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <FiChevronDown className="text-xl text-typo-outline-1" />
        </div>
      </div>

      {!hideError && error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
      {!error && helperText && <p>{helperText}</p>}
    </div>
  );
}
