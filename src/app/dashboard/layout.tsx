import PageWrapper from "@/components/page/PageWrapper";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>;
}
