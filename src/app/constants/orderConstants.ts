export const orderStatus = {
  Pending: {
    label: "Pending",
    color: "info",
  },
  PaymentReceived: {
    label: "Payment Completed",
    color: "success",
  },
  PaymentFailed: { label: "Payment Error", color: "error" },
};

export type OrderStatusKey = keyof typeof orderStatus;

export type OrderStatusConfig = {
  label: string;
  color: ChipColor;
};

export type OrderStatus = (typeof orderStatus)[keyof typeof orderStatus];

export type ChipColor =
  | "info"
  | "success"
  | "error"
  | "default"
  | "primary"
  | "secondary"
  | "warning";
