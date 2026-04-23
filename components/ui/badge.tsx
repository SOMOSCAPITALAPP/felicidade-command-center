import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
      {...props}
    />
  );
}
