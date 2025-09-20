"use client";
import AnimationWrapper from "@/components/animation/AnimationWrapper";
import Hero from "@/components/landing/Hero";
import Section from "@/components/landing/Section";
import { useIsMobile } from "@/hooks/use-mobile";
import useSession from "@/lib/session/use-session";

export default function Home() {
  const {
    session: { user },
  } = useSession();
  const isMobile = useIsMobile();
  return (
    <main className="relative flex flex-col items-center justify-start py-2 gap-0 w-full p-0 md:p-0 text-center">
      <Hero />
      <AnimationWrapper sliderClassName="bg-black">
        <Section
          imageUrl="/event2.jpg"
          heading="We provide all you need for your event"
          description="	You can rent event center, with entertainment and catering services
						all in one order"
          className="bg-black"
          reversed={isMobile}
        />
      </AnimationWrapper>

      <AnimationWrapper>
        <Section
          imageUrl="/event3.jpg"
          heading="Are you an event center hall owener"
          buttonText="Register with us"
          description="Partner with us to have your event hall listed on our platform"
          reversed
          url="/event-centers/register"
          className="bg-green-600"
        />
      </AnimationWrapper>

      <AnimationWrapper sliderClassName="bg-black">
        <Section
          imageUrl="/entertainment.jpg"
          heading="Are you an entertainer"
          buttonText="Register with us"
          description="	Partner with us to join the list of entertainers offering services in various events in our centers"
          reversed={isMobile}
          url="/entertainers/register"
          className="bg-black "
        />
      </AnimationWrapper>
      <AnimationWrapper>
        <Section
          imageUrl="/decoration.jpg"
          heading="Decorate your event with us"
          buttonText="Try decoration studio"
          description="Use our decoration studio to design your event hall with ease using AI"
          reversed
          url="/studio"
          className="bg-green-600 "
        />
      </AnimationWrapper>
    </main>
  );
}
