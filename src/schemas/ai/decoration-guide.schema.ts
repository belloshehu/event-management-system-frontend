import { z } from "zod";

export const decorationGuideSchema = z.object({
  description: z.string().optional(), // optional description of the event center decoration
  eventType: z.string().min(2, "Event type is required"), // event type: birthday, wedding, etc
  colors: z.array(z.string()).optional(), // array of colors to be used in the decoration
});

export type DecorationGuideSchemaType = z.infer<typeof decorationGuideSchema>;
