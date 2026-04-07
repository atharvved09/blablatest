import { useState } from "react";
import { Filter, Download, Search, Trash2 } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "refunded";

interface Order {
  id: string;
  customer: {
    name: string;
    avatar: string;
    email: string;
  };
  amount: number;
  status: OrderStatus;
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2547",
    customer: { name: "Sarah Chen", avatar: "SC", email: "sarah@example.com" },
    amount: 287.5,
    status: "delivered",
    date: "2026-04-07",
    items: 3,
  },
  {
    id: "ORD-2546",
    customer: { name: "Michael Torres", avatar: "MT", email: "michael@example.com" },
    amount: 542.0,
    status: "shipped",
    date: "2026-04-07",
    items: 5,
  },
  {
    id: "ORD-2545",
    customer: { name: "Emily Johnson", avatar: "EJ", email: "emily@example.com" },
    amount: 124.99,
    status: "processing",
    date: "2026-04-06",
    items: 2,
  },
  {
    id: "ORD-2544",
    customer: { name: "David Kim", avatar: "DK", email: "david@example.com" },
    amount: 890.0,
    status: "pending",
    date: "2026-04-06",
    items: 8,
  },
  {
    id: "ORD-2543",
    customer: { name: "Lisa Anderson", avatar: "LA", email: "lisa@example.com" },
    amount: 156.75,
    status: "refunded",
    date: "2026-04-05",
    items: 1,
  },
  {
    id: "ORD-2542",
    customer: { name: "James Wilson", avatar: "JW", email: "james@example.com" },
    amount: 423.25,
    status: "delivered",
    date: "2026-04-05",
    items: 4,
  },
  {
    id: "ORD-2541",
    customer: { name: "Maria Garcia", avatar: "MG", email: "maria@example.com" },
    amount: 678.0,
    status: "shipped",
    date: "2026-04-04",
    items: 6,
  },
  {
    id: "ORD-2540",
    customer: { name: "Robert Lee", avatar: "RL", email: "robert@example.com" },
    amount: 234.5,
    status: "processing",
    date: "2026-04-04",
    items: 3,
  },
];

export function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const filteredOrders = mockOrders
    .filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters and Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as "date" | "amount")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>

        {/* Export */}
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedOrders.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {selectedOrders.length} order{selectedOrders.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Update Status
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white dark:bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <Checkbox
                    checked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrders.includes(order.id);
                return (
                  <tr
                    key={order.id}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-primary/5"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">
                        #{order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {order.customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {order.customer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {order.items}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge variant={order.status}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </StatusBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {mockOrders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
