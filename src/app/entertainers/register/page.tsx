"use client";
import EntertainerForm from "@/components/entertainer/EntertainerForm";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";

export default function EntertainerRegistrationPage() {
  return (
    <PageWrapper>
      <Title
        title="Registeration"
        description="Register with us an entertainer"
        className="mb-5 bg-green-100 p-2"
      />
      <EntertainerForm onClose={() => null} />
    </PageWrapper>
  );
}
