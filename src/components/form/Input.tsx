import clsxm from "@/libs/clxsm";
import { useState } from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import RequiredLabel from "@/components/form/RequiredLabel";

export type InputProps = {
  id: string;
  label?: string;
  required?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  classname?: string;
  type?: string;
  readonly?: boolean;
  defaultValue?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  id,
  label,
  required,
  helperText,
  hideError = false,
  validation,
  className,
  type = "text",
  readOnly = false,
  defaultValue,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const error = get(errors, id);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-lg">
          {label} {validation?.required && <RequiredLabel />}
        </label>
      )}

      <div className="relative flex w-full gap-0">
        <div
          className={clsxm(
            "pointer-events-none absolute h-full w-full rounded-md border-[#808080] ring-1 ring-inset ring-[#808080]"
          )}
        />

        <div className={clsxm("relative w-full rounded-md")}>
          <input
            {...register(id, validation)}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            defaultValue={defaultValue}
            className={clsxm(
              "h-full w-full rounded-md border border-[#808080] px-3 py-2",
              "focus:outline-1 focus:outline-[#76E8FF] focus:ring-inset",
              "bg-neutral-10 text-base",
              "hover:ring-1 hover:ring-inset hover:ring-[#000]",
              "placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540]",
              readOnly && "cursor-not-allowed",
              error &&
                "bg-red-100 border-none ring-2 ring-inset ring-red-500 placeholder:text-[#092540] focus:ring-red-500 focus:outline-red-400",
              className
            )}
            aria-describedby={id}
            {...rest}
          />

          {type === "password" && (
            <div
              className={clsxm(
                "absolute bottom-0 right-0 h-full",
                "flex items-center justify-center pr-3",
                "text-lg text-slate-500 md:text-xl"
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </div>
          )}
        </div>
      </div>

      {!hideError && error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
      {helperText && <p>{helperText}</p>}
    </div>
  );
}
