import { useState } from "react";
import { Grid3x3, List, Plus, Search, Edit, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../components/ui/utils";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  sku: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    price: 99.99,
    stock: 124,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    sku: "WHP-001",
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 299.99,
    stock: 56,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    sku: "SWS-005",
  },
  {
    id: "3",
    name: "USB-C Charging Cable",
    price: 19.99,
    stock: 342,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1583573607873-4eb1e5c3cb5c?w=400",
    sku: "CAB-USB-C",
  },
  {
    id: "4",
    name: "Laptop Stand Aluminum",
    price: 59.99,
    stock: 78,
    category: "Office",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    sku: "LST-ALU-01",
  },
  {
    id: "5",
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    stock: 23,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    sku: "KBD-MEC-RGB",
  },
  {
    id: "6",
    name: "Wireless Mouse Ergonomic",
    price: 49.99,
    stock: 156,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    sku: "MSE-WRL-ERG",
  },
  {
    id: "7",
    name: "4K Webcam Pro",
    price: 179.99,
    stock: 12,
    category: "Video",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400",
    sku: "CAM-4K-PRO",
  },
  {
    id: "8",
    name: "Phone Case Premium Leather",
    price: 34.99,
    stock: 234,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400",
    sku: "PCS-LEA-PRM",
  },
];

type ViewMode = "grid" | "list";

export function Products() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" };
    if (stock < 30) return { text: "Low Stock", color: "text-amber-600 bg-amber-50" };
    return { text: "In Stock", color: "text-emerald-600 bg-emerald-50" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button className="gap-2 bg-[#6366F1] hover:bg-[#5558E3]">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-white dark:bg-slate-700 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-white dark:bg-slate-700 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-card rounded-lg border border-border overflow-hidden group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image */}
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Quick Edit Hover State */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <Button size="sm" variant="secondary" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    SKU: {product.sku}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-md font-medium",
                        stockStatus.color
                      )}
                    >
                      {product.stock} units
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  SKU
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-md font-medium inline-block",
                          stockStatus.color
                        )}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
