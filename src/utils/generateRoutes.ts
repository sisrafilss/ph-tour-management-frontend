import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((item) => ({
      Component: item.Component,
      path: item.url,
    }))
  );
};
