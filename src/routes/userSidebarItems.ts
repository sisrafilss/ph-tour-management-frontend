import { Booking } from "@/pages/User/Booking";
import type { ISidebarItems } from "@/types";

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "History",
    items: [
      {
        title: "Booking",
        Component: Booking,
        url: "/user/booking",
      },
    ],
  },
];
