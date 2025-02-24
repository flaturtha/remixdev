import * as React from "react"

interface ProgressProps {
  value?: number
  className?: string
}

export function Progress({ value = 0, className = "" }: ProgressProps) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full bg-gray-900 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
} 