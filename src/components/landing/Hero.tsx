"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { alfa_Slab_One } from "@/app/fonts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center rounded-none justify-center h-screen py-2 md:pt-10 gap-10 w-full text-center bg-white bg-blend-overlay bg-center  bg-no-repeat bg-cover">
      <div className="px-5 md:p-20 rounded-md text-white flex flex-col items-center justify-center w-full h-fit gap-10">
        <motion.h1
          initial={{ transform: "translateY(-100%)", scale: 0.7, opacity: 0.4 }}
          whileInView={{ transform: "translate(0)", scale: 1, opacity: 1 }}
          exit={{ transform: "translate(-100%)", scale: 0.6, opacity: 0.1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className={cn(
            `${alfa_Slab_One.className} animate-pulse font-extrabold text-4xl md:text-9xl text-green-600 leading-[1.3] text-center w-full capitalize  from-green-400 via-slate-600 to-green-500 bg-gradient-to-tr bg-clip-text text-transparent`
          )}
        >
          All-in-one event center
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center justify-center ">
          <div className="order-2 md:order-1 flex flex-col gap-5 items-center text-center md:text-left justify-center md:items-start md:justify-start">
            <motion.p
              initial={{ transform: "translateY(-100%)" }}
              whileInView={{ transform: "translate(0)" }}
              exit={{ transform: "translate(-100%), rotate(180deg)" }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-slate-600"
            >
              Renting an event center has never been easier, <br /> we make it seamless
              for you.
            </motion.p>
            <motion.p
              initial={{ transform: "translateY(-100%)" }}
              whileInView={{ transform: "translate(0)" }}
              exit={{ transform: "translate(-100%), rotate(180deg)" }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-slate-500"
            >
              Your all-in-one place for event centers, entertainment and more.
            </motion.p>
            <Link href="/event-centers">
              <Button
                variant={"secondary"}
                className="bg-green-400 text-white"
                size={"lg"}
              >
                Get Started
              </Button>
            </Link>
          </div>
          <DotLottieReact
            src="animations/super-man.lottie"
            loop
            autoplay
            className="order-1 md:order-2"
          />
        </div>
      </div>
    </section>
  );
}
