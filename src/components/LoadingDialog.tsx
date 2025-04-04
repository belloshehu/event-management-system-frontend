import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";

export function LoadingDialog({
  open,
  children,
  loadingText = "Loading...",
  className,
}: {
  open: boolean;
  children?: React.ReactNode;
  loadingText?: string;
  className?: string;
}) {
  return (
    <Dialog open={open} modal={true}>
      <DialogContent className="flex flex-col items-center justify-center bg-white/0 border-none">
        <DialogHeader className={cn("text-center text-white", className)}>
          <DialogTitle> {loadingText}</DialogTitle>
        </DialogHeader>
        <Loader size={34} className="text-white animate-spin" />
        {/* <h3 className={cn("text-white font-medium text-center animate-pulse")}></h3> */}
        {children && children}
      </DialogContent>
    </Dialog>
  );
}
