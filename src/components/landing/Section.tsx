import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import AnimationWrapper from "../animation/AnimationWrapper";

type SectionProps = {
  // Props type definition
  reversed?: boolean;
  heading: string;
  description: string;
  buttonText?: string;
  imageUrl: string;
  url?: string;
  className?: string;
};
export default function Section({
  reversed,
  imageUrl,
  buttonText,
  description,
  heading,
  url,
  className,
}: SectionProps) {
  return (
    <section
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-10 bg-green-600", className)}
    >
      <AnimationWrapper
        className={cn("w-full", {
          "order-2": reversed,
          "order-1": !reversed,
        })}
      >
        <Image
          src={imageUrl}
          alt="event"
          width={300}
          height={300}
          className={cn("object-cover w-full")}
        />
      </AnimationWrapper>
      <div
        className={cn("text-left flex flex-col gap-4 md:p-20 p-5 pt-8", {
          "order-1": reversed,
          "order-2": !reversed,
        })}
      >
        <AnimationWrapper>
          <motion.h1
            initial={{
              scale: 0.5,
              opacity: 0.6,
              transform: reversed ? "translate(100%)" : "translate(-100%)",
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transform: "translateY(0)",
            }}
            transition={{ duration: 0.4, type: "spring" }}
            exit={{
              scale: 0.3,
              opacity: 0.5,
              transform: reversed ? "translate(100%)" : "translate(-100%)",
            }}
            className="font-bold text-5xl text-green-200"
          >
            {heading}
          </motion.h1>
        </AnimationWrapper>
        <AnimationWrapper>
          <motion.p
            className=" text-lg text-slate-100"
            initial={{
              scale: 0.5,
              opacity: 0.6,
              transform: reversed ? "translate(-100%)" : "translate(100%)",
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transform: "translateY(0)",
            }}
            transition={{ duration: 0.6, type: "spring", delay: 0.05 }}
            exit={{
              scale: 0.3,
              opacity: 0.5,
              transform: reversed ? "translate(-100%)" : "translate(100%)",
            }}
          >
            {description}
          </motion.p>
        </AnimationWrapper>

        {buttonText && url && (
          <AnimationWrapper>
            <Link href={url}>
              <Button
                size={"lg"}
                className="mt-10 bg-green-600 shadow-md border-2 border-white"
              >
                {buttonText}
              </Button>
            </Link>
          </AnimationWrapper>
        )}
      </div>
    </section>
  );
}
