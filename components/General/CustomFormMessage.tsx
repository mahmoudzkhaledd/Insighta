import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import React from "react";
interface MessageProps {
  message?: string,
  title?: string,
  className?: string,
  children?: React.ReactNode,
  type?: 'error' | 'success' | 'warning';
}

export default function CustomFormMessage({ message, title, className, children, type, }: MessageProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 mb-4 text-sm  rounded-lg dark:bg-gray-800 ",
        {
          'bg-green-100': (type == 'success'),
          "bg-muted": (type == 'warning' || type == null),
          "bg-red-100": (type == 'error'),
        },
        className,
      )}
      role="alert"
    >
      {
        type == 'error' ?
          <AlertCircle className="w-auto text-red-400" />
          : type == 'success' ?
            <CheckCircle2 className="w-auto text-green-400" />
            : <AlertTriangle className="w-auto text-blue-400" />
      }
      <div className="w-full">
        <span className=" font-bold dark:text-white">{title}</span>
        <div>
          {children || message}
        </div>
      </div>
    </div>

  )
}
