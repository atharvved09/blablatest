import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "./ui/utils";

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  icon?: React.ReactNode;
  className?: string;
}

export function KPICard({ title, value, trend, icon, className }: KPICardProps) {
  return (
    <div className={cn("bg-white dark:bg-card rounded-lg border border-border p-6", className)}>
      {/* 8pt grid: p-6 = 24px, gap-4 = 16px, gap-2 = 8px */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.direction === "up" ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.direction === "up" ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend.value}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
