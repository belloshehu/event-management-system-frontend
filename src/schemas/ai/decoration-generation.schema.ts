import { z } from "zod";

export const decorationGenerationSchema = z.object({
  description: z.string().optional(), // optional description of the event center decoration
  image: z.any().optional(), // URL of the image of event center to be deocorated
  eventType: z.string().min(2, "Event type is required"), // event type: birthday, wedding, etc
  colors: z.array(z.string()).optional(), // array of colors to be used in the decoration
});

export type DecorationGenerationSchemaType = z.infer<typeof decorationGenerationSchema>;
