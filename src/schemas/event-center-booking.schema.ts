import { z } from "zod";

export const eventCenterBookingSchema = z.object({
  event_center: z.string(),
  event: z.string(),
  payment_reference: z
    .string()
    .min(16, "Payment reference should be atleast 16 characters")
    .max(255, "Payment reference should not exceed 255 characters"),
  payment_date: z.string(),
  payment_amount: z.number(),
  payment_currency: z.enum(["NGN", "USD"]),
  payment_method: z.enum(["card", "bank", "cash"]),
  payment_description: z.string().optional(),
  entertainers: z.array(z.string()).optional(),
});

export type EventCenterBookingPayloadType = z.infer<typeof eventCenterBookingSchema>;

export const eventCenterBookingPaymentSchema = z.object({
  payment_status: z.enum(["pending", "paid", "failed"]),
  payment_reference: z
    .string()
    .min(16, "Payment reference should be atleast 16 characters")
    .max(255, "Payment reference should not exceed 255 characters"),
  payment_date: z.string(),
  payment_amount: z.number(),
  payment_currency: z.enum(["NGN", "USD"]),
  payment_method: z.enum(["card", "bank", "cash"]),
  payment_description: z.string().optional(),
});

export type IEventCenterBookingPaymentPayloadType = z.infer<
  typeof eventCenterBookingPaymentSchema
>;
