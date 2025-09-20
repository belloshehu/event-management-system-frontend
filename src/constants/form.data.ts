import { SelectDataType } from "@/types/data.types";

export const supportedEvents: SelectDataType[] = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "conference", label: "Conference" },
  { value: "concert", label: "Concert" },
  { value: "party", label: "Party" },
  { value: "others", label: "Others" },
  { value: "training", label: "Training" },
];

export const entertainmentOptions: SelectDataType[] = [
  { value: "music", label: "Music" },
  { value: "comedy", label: "Comedy" },
  { value: "dance", label: "Dance" },
  { value: "dj", label: "DJ" },
  { value: "mc", label: "MC" },
  { value: "hypeman", label: "Hypeman" },
  { value: "others", label: "Others" },
];

export const supportedLanguagesOptions: SelectDataType[] = [
  { value: "english", label: "English" },
  { value: "yoruba", label: "Yoruba" },
  { value: "igbo", label: "Igbo" },
  { value: "hausa", label: "Hausa" },
  { value: "others", label: "Others" },
  { value: "urobo", label: "Urobo" },
];

export const currencyOptions: SelectDataType[] = [
  { value: "NGN", label: "NGN" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "CAD", label: "CAD" },
  { value: "AUD", label: "AUD" },
  { value: "ZAR", label: "ZAR" },
  { value: "GHS", label: "GHS" },
  { value: "KES", label: "KES" },
  { value: "SAR", label: "SAR" },
];

export const availabilityOptions: SelectDataType[] = [
  { value: "available", label: "Available" },
  { value: "booked", label: "Booked" },
];
