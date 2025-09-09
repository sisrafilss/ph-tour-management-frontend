import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Analytics"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/admin/analytics",
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        Component: AddTourType,
        url: "/admin/add-tour-type",
      },
      {
        title: "Add Tour",
        Component: AddTour,
        url: "/admin/add-tour",
      },
      {
        title: "Add Tour",
        Component: AddTour,
        url: "/admin/add-tour",
      },
    ],
  },
];
