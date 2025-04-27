"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  sliderClassName?: string;
}

export default function AnimationWrapper({
  children,
  className,
  sliderClassName,
}: AnimationWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  const sliderControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      sliderControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className={cn("w-fit overflow-hidden relative", className)}>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        transition={{ duration: 0.3, delay: 0.1, ease: "easeIn" }}
        animate={sliderControls}
        className={cn(
          "absolute top-0 bottom-0 left-0 right-0 bg-green-500 z-50",
          sliderClassName
        )}
      />
    </div>
  );
}
