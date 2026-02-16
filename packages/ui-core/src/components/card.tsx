import * as React from "react";

import { cn } from "@workspace/ui-core/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 hover:shadow-md transition-shadow duration-300",
        className
      )}
      {...props}
    />
  );
}

// function AnimatedCard({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div
//       className={cn("relative rounded-2xl overflow-hidden p-0.75", className)}
//       {...props}
//     >
//       <div className="relative inset-0 z-10 bg-card text-card-foreground h-full rounded-2xl p-6">
//         {children}
//       </div>
//       <span
//         aria-hidden="true"
//         className="
//           absolute inset-0 z-0
//           scale-x-[1.5] blur-xs
//           before:absolute before:inset-0
//           before:w-150 before:h-15
//           before:top-1/2 before:left-1/2
//           before:-translate-x-1/2 before:-translate-y-1/2
//           before:animate-disco-border
//           before:bg-conic
//           before:from-green-600 before:via-transparent before:to-transparent
//           before:content-['']
//         "
//       />
//     </div>
//   );
// }
function AnimatedCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden p-0.75", className)}
      {...props}
    >
      <div className="relative z-10 bg-card text-card-foreground h-full rounded-2xl p-6">
        {children}
      </div>

      {/* Only change: swap utility classes for one custom class */}
      <span aria-hidden="true" className="animated-ring" />
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  AnimatedCard,
};

