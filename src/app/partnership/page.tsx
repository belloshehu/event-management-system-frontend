"use client";
import AddCatererDialog from "@/components/caterer/AddCatererDialog";
import AddEntertainerDialog from "@/components/entertainer/AddEntertainerDialog";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";
import { remoteImages } from "@/constants/media/images";
import Image from "next/image";

export default function PartnershipPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 w-full items-start md:flex-row md:items-center md:justify-between bg-slate-100 p-4 rounded-lg">
        <Title title="Available partners" className="p-2" />
      </div>
      <p>
        Through our patnership program, we collaborate with top-tier caterers and
        entertainers to provide exceptional services for your events. Whether you're
        planning a wedding, corporate event, or private party, our partners are here to
        make your occasion unforgettable. Join us in creating memorable experiences with
        the best in the industry.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mt-10">
        <div className="flex flex-col gap-5 p-5 md:p-10 bg-slate-100 rounded-md border-[0px] border-l-slate-200">
          <Image
            alt="entertainer"
            src={remoteImages.cateringImage1}
            width={200}
            height={100}
            className="w-full h-[100px] object-cover rounded-md"
          />
          <h2 className="text-2xl font-semibold">Caterers</h2>
          <p>
            Our partnered caterers are renowned for their culinary excellence and
            exceptional service. They offer a wide range of cuisines and can tailor menus
            to suit your event's theme and dietary requirements. From intimate gatherings
            to grand celebrations, our caterers ensure a delightful dining experience for
            you and your guests.
          </p>
          <AddCatererDialog triggerText="Register as caterer" />
        </div>
        <div className="flex flex-col gap-5 p-5 md:p-10 bg-slate-100 rounded-md border-[0px] border-l-slate-200">
          <Image
            alt="entertainer"
            src={remoteImages.entertainmentDj2}
            width={200}
            height={100}
            className="w-full h-[100px] object-cover rounded-md"
          />
          <h2 className="text-2xl font-semibold">Entertainers</h2>
          <p>
            Our entertainers bring energy and excitement to any event. Whether you're
            looking for live music, DJs, dancers, or unique performances, our partners
            have the talent and experience to captivate your audience. They work closely
            with you to understand your vision and deliver unforgettable entertainment
            that enhances your event's atmosphere.
          </p>
          <AddEntertainerDialog triggerText="Register as entertainer" />
        </div>
      </div>
    </PageWrapper>
  );
}
