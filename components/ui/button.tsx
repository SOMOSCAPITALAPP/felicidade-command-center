import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-ink text-paper hover:bg-[#2d2924]",
        variant === "secondary" &&
          "bg-sand text-ink hover:bg-[#dcc9b1]",
        variant === "ghost" &&
          "border border-line bg-transparent text-ink hover:bg-white/60",
        className,
      )}
      {...props}
    />
  );
}
