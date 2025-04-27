"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function AuthPageContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-5 place-content-center justify-items-center w-full">
      <DotLottieReact
        src="animations/auth.lottie"
        loop
        autoplay
        className="hidden md:block  rounded-md h-full w-full"
      />
      {children}
    </div>
  );
}
