"use client";
import CustomAvatar from "@/components/CustomAvatar";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const router = useRouter();

  if (!session) router.push("/login");
  const {
    user: { firstName, lastName, email, image },
  } = session;
  return (
    <PageWrapper>
      <div className="flex  gap-2 items-start justify-between w-full bg-green-200 shadow-md rounded-md p-5">
        <div className="flex items-center justify-start gap-5">
          {image && (
            <CustomAvatar
              fallback={`${firstName.slice(0, 1) + lastName.slice(0, 1)}`}
              src={image}
            />
          )}
          <Title
            title={`${firstName} ${lastName}`}
            className={`font-medium md:font-extrabold text-xl md:text-2xl text-green-500 text-left self-start`}
          />
        </div>
        <small>{email}</small>
      </div>
      {children}
    </PageWrapper>
  );
}
