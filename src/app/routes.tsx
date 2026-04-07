import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Products } from "./pages/Products";
import { Analytics } from "./pages/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout><Dashboard /></DashboardLayout>,
  },
  {
    path: "/orders",
    element: <DashboardLayout><Orders /></DashboardLayout>,
  },
  {
    path: "/products",
    element: <DashboardLayout><Products /></DashboardLayout>,
  },
  {
    path: "/analytics",
    element: <DashboardLayout><Analytics /></DashboardLayout>,
  },
]);
