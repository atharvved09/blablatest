import { useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

// Mock data
const weeklyData = [
  { name: "Mon", revenue: 12400 },
  { name: "Tue", revenue: 15300 },
  { name: "Wed", revenue: 18200 },
  { name: "Thu", revenue: 14800 },
  { name: "Fri", revenue: 22100 },
  { name: "Sat", revenue: 28500 },
  { name: "Sun", revenue: 24300 },
];

const monthlyData = [
  { name: "Week 1", revenue: 85000 },
  { name: "Week 2", revenue: 95000 },
  { name: "Week 3", revenue: 110000 },
  { name: "Week 4", revenue: 125000 },
];

const recentOrders = [
  {
    id: "#ORD-2547",
    customer: "Sarah Chen",
    avatar: "SC",
    amount: "$287.50",
    status: "delivered" as const,
    date: "2 min ago",
  },
  {
    id: "#ORD-2546",
    customer: "Michael Torres",
    avatar: "MT",
    amount: "$542.00",
    status: "shipped" as const,
    date: "15 min ago",
  },
  {
    id: "#ORD-2545",
    customer: "Emily Johnson",
    avatar: "EJ",
    amount: "$124.99",
    status: "processing" as const,
    date: "1 hour ago",
  },
  {
    id: "#ORD-2544",
    customer: "David Kim",
    avatar: "DK",
    amount: "$890.00",
    status: "pending" as const,
    date: "2 hours ago",
  },
  {
    id: "#ORD-2543",
    customer: "Lisa Anderson",
    avatar: "LA",
    amount: "$156.75",
    status: "refunded" as const,
    date: "3 hours ago",
  },
];

const topProducts = [
  { name: "Wireless Headphones Pro", sales: 1247, revenue: "$124,700" },
  { name: "Smart Watch Series 5", sales: 892, revenue: "$89,200" },
  { name: "USB-C Charging Cable", sales: 2103, revenue: "$42,060" },
  { name: "Laptop Stand Aluminum", sales: 643, revenue: "$38,580" },
];

export function Dashboard() {
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");
  const chartData = timeRange === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      {/* 8pt grid: space-y-6 = 24px gap between sections */}
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* KPI Cards - grid with gap-6 = 24px */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Sales"
          value="$125,420"
          trend={{ value: 12.5, direction: "up" }}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <KPICard
          title="Orders"
          value="2,547"
          trend={{ value: 8.2, direction: "up" }}
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <KPICard
          title="Conversion Rate"
          value="3.24%"
          trend={{ value: 2.1, direction: "down" }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="Avg Order Value"
          value="$49.23"
          trend={{ value: 5.4, direction: "up" }}
          icon={<CreditCard className="w-5 h-5" />}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Revenue</h2>
            <p className="text-sm text-muted-foreground">
              Track your sales performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("weekly")}
              className={timeRange === "weekly" ? "bg-[#6366F1]" : ""}
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("monthly")}
              className={timeRange === "monthly" ? "bg-[#6366F1]" : ""}
            >
              Monthly
            </Button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="name"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: "#6366F1", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white dark:bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <p className="text-sm text-muted-foreground">
              Latest customer transactions
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Order
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {order.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge variant={order.status}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products - Takes 1 column */}
        <div className="bg-white dark:bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Top Products</h2>
            <p className="text-sm text-muted-foreground">Best sellers this week</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales.toLocaleString()} sales
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {product.revenue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
