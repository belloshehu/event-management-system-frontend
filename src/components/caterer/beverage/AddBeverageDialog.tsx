import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BeverageForm from "@/components/caterer/beverage/BeverageForm";
import { useState } from "react";

export default function AddBeverageDialog({
  triggerText,
  catererId,
}: {
  triggerText?: string;
  catererId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={true} onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="bg-green-400 text-white p-2 px-4 rounded-md">
        {triggerText || "Add Beverage"}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Beverage Form</DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-5 overflow-y-auto max-[80vh]">
            Fill the form to add a new beverage
            <BeverageForm onClose={() => setIsOpen(false)} catererId={catererId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
