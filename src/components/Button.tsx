import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  type: "primary" | "secondary";
  label: string;
  className?: string;
  onClick?: () => void;
  submit?: boolean;
  disabled?: boolean;
};

const Button = ({
  type,
  label,
  className,
  onClick,
  submit,
  disabled,
}: ButtonProps) => {
  const classes = {
    primary: "bg-navy text-white",
    secondary: "bg-white/40 text-navy",
  };

  return (
    <button
      className={`flex items-center justify-center h-[40px] border-0 rounded-[8px] font-semibold text-[16px] cursor-pointer transition disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none ${className} ${classes[type]}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
