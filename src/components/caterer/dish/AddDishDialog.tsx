import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DishForm from "@/components/caterer/dish/DishForm";
import { useState } from "react";

export default function AddDishDialog({
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
        {triggerText || "Add Dish"}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dish Form</DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-5 overflow-y-auto max-[80vh]">
            Fill the form to add a new dish
            <DishForm onClose={() => setIsOpen(false)} catererId={catererId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
