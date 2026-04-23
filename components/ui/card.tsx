import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-white/70 bg-paper/90 shadow-panel backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
