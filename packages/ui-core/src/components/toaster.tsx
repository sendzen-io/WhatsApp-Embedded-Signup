"use client"

import * as React from "react"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Bell,
} from "lucide-react"
import { useToast } from "@workspace/ui-core/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@workspace/ui-core/components/toast"
import { cn } from "@workspace/ui-core/lib/utils"

type ToastVariant = "default" | "destructive" | "success" | "warning" | "information"

const getToastIcon = (variant?: ToastVariant) => {
  const iconProps = {
    className: "h-5 w-5 shrink-0",
  }

  switch (variant) {
    case "success":
      return <CheckCircle2 {...iconProps} className={cn(iconProps.className, "text-green-800")} />
    case "destructive":
      return <XCircle {...iconProps} className={cn(iconProps.className, "text-destructive-foreground")} />
    case "warning":
      return <AlertTriangle {...iconProps} className={cn(iconProps.className, "text-yellow-800 dark:text-yellow-400")} />
    case "information":
      return <Info {...iconProps} className={cn(iconProps.className, "text-blue-800 dark:text-blue-400")} />
    case "default":
    default:
      return <Bell {...iconProps} className={cn(iconProps.className, "text-foreground/70")} />
  }
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const Icon = getToastIcon(variant as ToastVariant)
        
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex flex-col gap-3 min-w-0">
              <div className="flex gap-3 items-start flex-nowrap min-w-0">
                {Icon}
                <div className="grid gap-1 flex-1 min-w-0">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
              {action && <div className="flex justify-center">{action}</div>}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

