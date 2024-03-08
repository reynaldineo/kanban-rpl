import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/libs/clxsm";

enum ButtonVariant {
  "primary",
  "warning",
  "danger",
  "success",
  "gray",
}

enum ButtonSize {
  "sm",
  "md",
  "lg",
}

type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  icon?: IconType;
  iconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<"button">;

export default function Button({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  size = "md",
  variant = "primary",
  icon: Icon,
  iconClassName,
  textClassName,
  ref,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsxm(
        "button inline-flex items-center justify-center ",
        "border-2 font-medium rounded-2xl",

        //#region  //*=========== Size ===========
        [
          size === "lg" && ["min-h-[51px] px-8 py-3 text-lg"],
          size === "md" && ["min-h-[48px] px-5 py-2 text-base"],
          size === "sm" && ["min-h-[32px] px-4 py-1.5 text-sm"],
        ],

        //#region  //*=========== Variants ===========
        [
          variant === "primary" && [
            "bg-blue-500 text-white",
            "hover:bg-blue-600 hover:text-gray-300",
            "active:bg-blue-400 active:text-black",
          ],
          variant === "warning" && [
            "bg-yellow-500 text-white",
            "hover:bg-yellow-600 hover:text-gray-300",
            "active:bg-yellow-400 active:text-black",
          ],
          variant === "danger" && [
            "bg-red-500 text-white",
            "hover:bg-red-600 hover:text-gray-300",
            "active:bg-red-400 active:text-black",
          ],
          variant === "success" && [
            "bg-green-500 text-white",
            "hover:bg-green-500 hover:text-gray-300",
            "active:bg-green-400 active:text-black",
          ],
          variant === "gray" && [
            "bg-gray-500 text-white",
            "hover:bg-gray-500 hover:text-gray-300",
            "active:bg-gray-400 active:text-black",
          ],
        ],
        "disabled:cursor-not-allowed",
        isLoading && "relative cursor-wait transition-none ",
        className
      )}
      {...rest}
    >
      {isLoading && (
        <div className="text-white flex justify-center items-center gap-2">
          <ImSpinner2 className="animate-spin" />
        </div>
      )}
      {Icon && (
        <div className="mr-2">
          <Icon className={clsxm("text-2xl font-semibold", iconClassName)} />
        </div>
      )}
      <span className={clsxm(isLoading && "hidden", textClassName)}>
        {children}
      </span>
    </button>
  );
}
