import { NavigationItemType } from "@/types/navigation.types";

export const navItems: NavigationItemType[] = [
  { path: "/events", name: "Events" },
  { path: "/entertainers", name: "Entertainers" },
  { path: "/partnership", name: "Partnership" },
  { path: "/event-centers", name: "Event centers" },
];

export const adminNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    name: "Events",
    path: "/dashboard/events/admin",
  },
  {
    name: "Entertainers",
    path: "/dashboard/entertainers/admin",
  },
  {
    name: "Event Centers",
    path: "/dashboard/event-centers/admin",
  },
  {
    name: "Users",
    path: "/dashboard/users/admin",
  },
  {
    name: "Partnership",
    path: "/dashboard/partnership/admin",
  },
  {
    name: "Settings",
    path: "/dashboard/settings/admin",
  },
  {
    name: "Messages",
    path: "/dashboard/messages/admin",
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications/admin",
  },
];

export const userNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
  },
  {
    name: "Bookings",
    path: "/dashboard/bookings/user",
  },
  {
    name: "favorites",
    path: "/dashboard/favorites/user",
  },
  {
    name: "Settings",
    path: "/dashboard/settings/user",
  },
  {
    name: "Messages",
    path: "/dashboard/messages/user",
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications/user",
  },
];

export const partnerNavItems: NavigationItemType[] = [
  {
    name: "Dashboard",
    path: "dashboard/partner",
  },
  {
    name: "Services",
    path: "/dashboard/services/partner",
  },
  {
    name: "Bookings",
    path: "/dashboard/bookings/partner",
  },
  {
    name: "Settings",
    path: "/dashboard/settings/partner",
  },
  {
    name: "Messages",
    path: "/dashboard/messages/partner",
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications/partner",
  },
];
