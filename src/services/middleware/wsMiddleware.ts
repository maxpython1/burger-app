import type {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload
} from "@reduxjs/toolkit";
import type { Middleware } from "redux";

type TWsActions<TMessage> = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<TMessage>;
};

export const createMiddleware = <TMessage>(
  wsActions: TWsActions<TMessage>
): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
      wsActions;

    if (wsConnect.match(action)) {
      socket = new WebSocket(action.payload);

      socket.onopen = () => store.dispatch(wsOpen());
      socket.onclose = () => store.dispatch(wsClose());

      socket.onerror = () => store.dispatch(wsError("WebSocket error"));

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data?.success) {
            store.dispatch(wsMessage(data as TMessage));
          } else {
            store.dispatch(wsError(data?.message || "WebSocket error"));
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
