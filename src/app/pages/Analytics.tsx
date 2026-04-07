import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Globe, ShoppingCart, Smartphone, Store } from "lucide-react";

// Mock data for sales by channel
const channelData = [
  { name: "Website", sales: 45200, fill: "#6366F1" },
  { name: "Mobile App", sales: 32100, fill: "#8B5CF6" },
  { name: "Marketplace", sales: 28400, fill: "#EC4899" },
  { name: "In-Store", sales: 19700, fill: "#F59E0B" },
];

// Mock data for traffic sources
const trafficData = [
  { name: "Organic Search", value: 42, fill: "#6366F1" },
  { name: "Direct", value: 28, fill: "#8B5CF6" },
  { name: "Social Media", value: 18, fill: "#EC4899" },
  { name: "Paid Ads", value: 12, fill: "#F59E0B" },
];

// Mock data for order heatmap (30 days)
const generateHeatmapData = () => {
  const data = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = days[date.getDay()];
    const orders = Math.floor(Math.random() * 150) + 20;
    
    data.push({
      date: date.toISOString().split("T")[0],
      day: dayOfWeek,
      orders,
      intensity: orders > 120 ? "high" : orders > 80 ? "medium" : "low",
    });
  }
  
  return data;
};

const heatmapData = generateHeatmapData();

// Mock data for geographic sales
const geoData = [
  { country: "United States", sales: 42500, percentage: 34 },
  { country: "United Kingdom", sales: 28300, percentage: 22.5 },
  { country: "Canada", sales: 19200, percentage: 15.3 },
  { country: "Germany", sales: 15800, percentage: 12.6 },
  { country: "Australia", sales: 12100, percentage: 9.6 },
  { country: "Others", sales: 7500, percentage: 6 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#64748B"];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Analytics</h1>
        <p className="text-muted-foreground">
          Track performance metrics and insights
        </p>
      </div>

      {/* Top Row - Sales by Channel & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Channel */}
        <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Sales by Channel</h2>
            <p className="text-sm text-muted-foreground">
              Revenue breakdown across platforms
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
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
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Icons */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-2">
                <Globe className="w-5 h-5 text-[#6366F1]" />
              </div>
              <p className="text-xs text-muted-foreground">Website</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2">
                <Smartphone className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <p className="text-xs text-muted-foreground">Mobile</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-[#EC4899]/10 flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-5 h-5 text-[#EC4899]" />
              </div>
              <p className="text-xs text-muted-foreground">Market</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-2">
                <Store className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <p className="text-xs text-muted-foreground">In-Store</p>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Traffic Sources</h2>
            <p className="text-sm text-muted-foreground">
              Where your visitors come from
            </p>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
            {trafficData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Volume Heatmap */}
      <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Order Volume Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Daily order activity over the last 30 days
          </p>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="inline-flex gap-1 min-w-max pb-2">
            {heatmapData.map((day, index) => {
              const intensity = day.orders > 120 ? 4 : day.orders > 100 ? 3 : day.orders > 80 ? 2 : 1;
              const bgColors = [
                "bg-slate-100 dark:bg-slate-800",
                "bg-[#6366F1]/20",
                "bg-[#6366F1]/40",
                "bg-[#6366F1]/60",
                "bg-[#6366F1]/80",
              ];

              return (
                <div
                  key={index}
                  className="group relative"
                  title={`${day.date}: ${day.orders} orders`}
                >
                  <div
                    className={`w-10 h-10 rounded-md ${bgColors[intensity]} border border-border hover:ring-2 hover:ring-[#6366F1] transition-all cursor-pointer flex flex-col items-center justify-center`}
                  >
                    <span className="text-xs font-medium text-foreground">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <p className="font-medium">{day.orders} orders</p>
                      <p className="text-slate-300">{day.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <span className="text-sm text-muted-foreground">Less</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 border border-border" />
            <div className="w-6 h-6 rounded bg-[#6366F1]/20 border border-border" />
            <div className="w-6 h-6 rounded bg-[#6366F1]/40 border border-border" />
            <div className="w-6 h-6 rounded bg-[#6366F1]/60 border border-border" />
            <div className="w-6 h-6 rounded bg-[#6366F1]/80 border border-border" />
          </div>
          <span className="text-sm text-muted-foreground">More</span>
        </div>
      </div>

      {/* Geographic Sales */}
      <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Geographic Sales</h2>
          <p className="text-sm text-muted-foreground">
            Revenue distribution by country
          </p>
        </div>

        <div className="space-y-4">
          {geoData.map((country, index) => (
            <div key={country.country}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm text-white"
                    style={{ backgroundColor: COLORS[index] }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-foreground">
                    ${country.sales.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${country.percentage}%`,
                    backgroundColor: COLORS[index],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Total Sales</span>
          <span className="text-lg font-bold text-foreground">
            ${geoData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
