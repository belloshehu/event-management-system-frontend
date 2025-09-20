import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";

export type PaymentResponseType<T> = T;

export type FlutterwaveResponseType = PaymentResponseType<
  FlutterWaveResponse & {
    created_at: string;
    currency: "NGN" | "USD";
  }
>;
