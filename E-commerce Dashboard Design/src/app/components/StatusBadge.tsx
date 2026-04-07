import { cn } from "./ui/utils";

type StatusVariant = "pending" | "processing" | "shipped" | "delivered" | "refunded";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const statusStyles: Record<StatusVariant, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  shipped: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  refunded: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        statusStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
