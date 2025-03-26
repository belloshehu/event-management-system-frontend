"use client";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <aside className="p-5 rounded-md shadow-sm bg-slate-100 w-fit h-fit fixed  flex flex-col items-start justify-start gap-5">
        {renderNavItems}
      </aside> */}
      {/* <DashboardTab role="admin" className="w-full " /> */}
      {children}
    </>
  );
}
