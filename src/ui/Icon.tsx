import type { ReactNode } from "react";

type IconProps = {
  children: ReactNode;
  className?: string;
};

export function Icon({ children, className }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {children}
    </span>
  );
}
