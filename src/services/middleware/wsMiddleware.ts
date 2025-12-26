import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";

export const createMiddleware = (wsActions: any): Middleware => {
  let socket: WebSocket | null = null;

  const isValidOrder = (order: any): boolean => {
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

  return (store) => (next) => (action) => {
    const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
      wsActions;

    if (wsConnect.match(action)) {
      socket = new WebSocket((action as PayloadAction<string>).payload);

      socket.onopen = () => {
        store.dispatch(wsOpen());
      };
      socket.onclose = () => {
        store.dispatch(wsClose());
      };
      socket.onerror = () => {
        store.dispatch(wsError());
      };
      socket.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.success && Array.isArray(data.orders)) {
            const validOrders = data.orders.filter(isValidOrder);
            store.dispatch(
              wsMessage({
                ...data,
                orders: validOrders
              })
            );
          } else {
            store.dispatch(wsError(data.message || "WebSocket error"));
            socket?.close();
          }
        } catch {
          store.dispatch(wsError("WebSocket error"));
        }
      };
    }

    if (wsDisconnect.match(action)) {
      socket?.close();
      socket = null;
    }

    return next(action);
  };
};
