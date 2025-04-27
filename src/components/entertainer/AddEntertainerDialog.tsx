import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EntertainerForm from "./EntertainerForm";
import { useState } from "react";

export default function AddEntertainerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={true} onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-green-400 text-white p-2 px-4 rounded-md">
        Add Entertainer
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Entertainer Form</DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-5 overflow-y-auto max-[80vh]">
            Fill the form to add a new entertainer
            <EntertainerForm onClose={() => setIsOpen(!isOpen)} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
