import { cn } from "../../lib/utils";
import type { HTMLAttributes } from "react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export const Loader = ({ className, size = 16, ...props }: LoaderProps) => (
  <div
    className={cn(
      "typing-loader inline-flex items-center justify-center",
      className
    )}
    aria-label="Typing"
    role="status"
    style={{ ["--typing-dot-size" as string]: `${size / 2}px` }}
    {...props}
  >
    <span className="typing-dot" />
    <span className="typing-dot" />
    <span className="typing-dot" />
  </div>
);
