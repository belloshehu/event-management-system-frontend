import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventCenterForm from "./EventCenterForm";

export default function AddEventCenterDialog() {
  return (
    <Dialog modal={true}>
      <DialogTrigger className="bg-black text-white p-2 px-4 rounded-md">
        Add Event Center
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Event Center Form</DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-5 overflow-y-auto max-[80vh]">
            Fill the form to add a new event center
            <EventCenterForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
