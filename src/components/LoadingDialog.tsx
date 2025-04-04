import { Dialog, DialogContent } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export function LoadingDialog({
  open,
  children,
  loadingText = "Loading...",
}: {
  open: boolean;
  children?: React.ReactNode;
  loadingText?: string;
}) {
  return (
    <Dialog open={open} modal={true}>
      <DialogContent className="flex flex-col items-center justify-center bg-white/0 border-none">
        <Loader size={34} className="text-white animate-spin" />
        <h3 className={cn("text-white font-medium text-center animate-pulse")}>
          {loadingText}
        </h3>
        {children && children}
      </DialogContent>
    </Dialog>
  );
}
