import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Plus } from "lucide-react";

export default function NoDataCard({
  message,
  title,
  className,
  action,
}: {
  message: string;
  title: string;
  className?: string;
  action?: { button: boolean; buttonText: string } | null;
}) {
  return (
    <Card className={cn("flex flex-col justify-center items-center", className)}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      {action && action.buttonText && (
        <CardContent>
          <Button className="bg-green-500 ">
            <Plus size={24} />
            {action.buttonText}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
