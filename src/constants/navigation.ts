import { NavigationItemType } from "@/types/navigation.types";

export const navItems: NavigationItemType[] = [
  { path: "/events", name: "Events" },
  { path: "/entertainers", name: "Entertainers" },
  { path: "/partnership", name: "Partnership" },
  { path: "/event-centers", name: "Event centers" },
  // { path: "/event-planner", name: "Event planner" },
  { path: "/studio", name: "Studio" },
];

export const adminNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    active: true,
  },
  {
    name: "Events",
    path: "/dashboard/admin/events",
    active: true,
  },
  {
    name: "Entertainers",
    path: "/dashboard/admin/entertainers",
    active: true,
  },
  {
    name: "Event Centers",
    path: "/dashboard/admin/event-centers",
    active: true,
  },
  {
    name: "Users",
    path: "/dashboard/admin/users",
    active: true,
  },
  {
    name: "Partnership",
    path: "/dashboard/admin/partnership",
    active: true,
  },
  {
    name: "Settings",
    path: "/dashboard/admin/settings",
    active: false,
  },
  {
    name: "Messages",
    path: "/dashboard/admin/messages",
    active: false,
  },
  {
    name: "Notifications",
    path: "/dashboard/admin/notifications",
  },
];

export const userNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
    active: true,
  },
  {
    name: "Bookings",
    path: "/dashboard/user/bookings",
    active: true,
  },
  {
    name: "favorites",
    path: "/dashboard/user/favorites",
    active: false,
  },
  {
    name: "Settings",
    path: "/dashboard/user/settings",
    active: false,
  },
  {
    name: "Messages",
    path: "/dashboard/user/messages",
    active: false,
  },
  {
    name: "Notifications",
    path: "/dashboard/user/notifications",
    active: true,
  },
];

export const partnerNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "dashboard/partner",
    active: true,
  },
  {
    name: "Bookings",
    path: "/dashboard/partner/bookings",
    active: true,
  },
  {
    name: "Settings",
    path: "/dashboard/partner/settings",
    active: false,
  },
  {
    name: "Messages",
    path: "/dashboard/partner/messages",
    active: false,
  },
  {
    name: "Notifications",
    path: "/dashboard/partner/notifications",
    active: true,
  },
];
