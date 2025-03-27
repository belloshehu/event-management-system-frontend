import { z } from "zod";

export const eventCenterValidationSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  capacity: z.coerce.number().min(20, "Capacity must be at least 20"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  supported_events_types: z
    .array(z.string())
    .min(1, "At least one supported event type is required"),
  contact_number: z.string().min(11, "Contact number must be at least 11"),
  contact_email: z.string().email("Invalid email address"),
});

export type EventCenterValidationSchemaType = z.infer<typeof eventCenterValidationSchema>;
