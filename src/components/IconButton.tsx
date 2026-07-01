import { ButtonHTMLAttributes } from "react";

type IconButtonProps = {
  icon: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const IconButton = ({ icon, className = "", ...rest }: IconButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center w-[32px] h-[32px] rounded-[12px] border-0 bg-navy text-white cursor-pointer transition hover:bg-navy-strong disabled:bg-navy/40 disabled:cursor-default disabled:hover:bg-navy/40 motion-reduce:transition-none ${className}`}
      {...rest}
    >
      <span
        className="material-symbols-rounded !text-[16px]"
        aria-hidden="true"
      >
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
