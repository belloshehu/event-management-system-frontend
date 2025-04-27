"use client";

import { useState } from "react";
import DecorationGuideForm from "@/components/ai/studio/DecorationGuideForm";
import Title from "@/components/Title";
import { GenerateContentResponse } from "@google/genai";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function StudioDecorationGuide() {
  const [contents, setContents] = useState<GenerateContentResponse | null>(null);
  const [showForm, setShowForm] = useState(true);

  // handle image download
  const handleImageDownload = (imageData: string) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    link.download = new Date().toISOString() + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image saved successfully");
  };

  return (
    <div className="flex flex-col gap-4">
      {!contents && (
        <Title
          title="Decoration Guide"
          description="Get decoration guide by speciying an event type, e.g, birthday, wedding and prefered colors."
        />
      )}
      {contents?.candidates && (
        <div className="w-full justify-center items-center flex flex-col gap-4">
          {contents.candidates[0].content?.parts?.map((part, index: number) => {
            if (part.text) {
              return (
                <div key={index} className="mb-4">
                  <ReactMarkdown>{part.text}</ReactMarkdown>
                </div>
              );
            } else {
              const imageData = part.inlineData?.data;
              const buffer = Buffer.from(imageData!, "base64");
              const image = `data:image/png;base64,${buffer.toString("base64")}`;
              return (
                <div key={index} className="mb-4 w-full my-10 flex flex-col gap-10">
                  <Image
                    src={image}
                    alt="Decoration"
                    className="h-auto object-cover w-full md:w-1/3"
                    width={500}
                    height={500}
                  />
                  {/* download image file when click */}
                  <Button onClick={() => handleImageDownload(image)} className="w-fit">
                    Download image
                  </Button>
                </div>
              );
            }
          })}
        </div>
      )}
      <DecorationGuideForm
        setContents={setContents}
        className={cn("", { "-right-[100%]": !showForm })} // hide form when not showing
        setShowForm={setShowForm}
      />
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-500 fixed bottom-10  right-10"
        >
          Generate another decoration
        </Button>
      )}
    </div>
  );
}
