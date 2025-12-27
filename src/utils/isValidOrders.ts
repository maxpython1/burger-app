import { TOrder } from "./types";

export const isValidOrder = (order: any): order is TOrder => {
  return (
    order &&
    typeof order._id === "string" &&
    typeof order.number === "number" &&
    Array.isArray(order.ingredients) &&
    order.ingredients.length > 0 &&
    typeof order.status === "string" &&
    typeof order.createdAt === "string"
  );
};
