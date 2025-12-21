import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";

export const createMiddleware = (wsActions: any): Middleware => {
  let socket: WebSocket | null = null;

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
          store.dispatch(wsMessage(data));
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
