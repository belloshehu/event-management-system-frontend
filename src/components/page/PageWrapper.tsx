"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface PageWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  const pathname = usePathname();
  // if on home page, do not show the wrapper
  if (pathname === "/") return <>{children}</>;
  return (
    <div
      className={cn(
        "flex items-center justify-start min-h-screen flex-col gap-5 p-5 py-20 pt-32 md:px-20 bg-slate-50",
        className
      )}
    >
      {children}
    </div>
  );
}
