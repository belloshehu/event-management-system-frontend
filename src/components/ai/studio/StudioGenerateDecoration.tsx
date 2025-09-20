"use client";

import { useState } from "react";
import Title from "@/components/Title";
import { GenerateContentResponse } from "@google/genai";
import DecorationGnerationForm from "./DecorationGenerationForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function StudioGenerateDecoration() {
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
          title="Generate decoration"
          description="Generate a decoration by uploading image of an event center and/or speciying the event type, e.g, birthday, wedding"
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
                <div key={index} className="mb-4 w-full my-10 flex flex-col gap-5">
                  <h1>Decorated hall by AI</h1>
                  <Image
                    src={image}
                    alt="Decoration"
                    className="h-auto object-cover w-full md:w-2/5"
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
      <DecorationGnerationForm
        setContents={setContents}
        className={cn("", { "-right-[100%]": !showForm })} // hide form when not showing
        setShowForm={setShowForm}
      />
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-500 fixed bottom-10 right-10 w-fit"
        >
          Generate another decoration
        </Button>
      )}
    </div>
  );
}
