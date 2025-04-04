import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventCenterForm from "./EventCenterForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AddEventCenterDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    // Logic to close the dialog
    setOpen(false);
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn("bg-green-400 text-white p-2 px-4 rounded-md", className)}
      >
        Add Event Center
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Event Center Form</DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-5 overflow-y-auto max-[80vh] text-left">
            Fill the form to add a new event center
            <EventCenterForm onClose={handleClose} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
