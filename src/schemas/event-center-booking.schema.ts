import { z } from "zod";

export const eventCenterBookingSchema = z.object({
  event_center: z.string(),
  event: z.string({ message: "Event Id is required" }),
  payment_reference: z
    .string()
    .min(8, "Payment reference should be atleast 8 characters")
    .max(255, "Payment reference should not exceed 255 characters"),
  payment_date: z.coerce.date({ message: "Payment date is required" }),
  payment_amount: z.number({ message: "Payment amount is required" }),
  payment_currency: z.enum(["NGN", "USD"]).optional(),
  payment_status: z.enum(["pending", "successful", "failed"]),
  payment_method: z.enum(["card", "bank", "cash", "ussd"]).optional(),
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

// schema for event center booking query params validation
export const getEventCenterBookingQueryValidationSchema = z.object({
  availability: z.enum(["available", "booked", "all"]).optional(),
  user: z.string().optional(),
  event_center: z.string().optional(),
  event: z.string().optional(),
  booking_status: z.enum(["pending", "successful", "cancelled"]).optional(),
  payment_status: z.enum(["pending", "successful", "failed"]).optional(),
});

export type IGetEventCenterBookingQueryType = z.infer<
  typeof getEventCenterBookingQueryValidationSchema
>;
export type IEventCenterBookingPaymentPayloadType = z.infer<
  typeof eventCenterBookingPaymentSchema
>;
