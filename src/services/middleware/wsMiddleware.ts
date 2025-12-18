import { Middleware } from "redux";
import {
  wsClose,
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessage,
  wsOpen
} from "../slices/feedSlice";

export const wsMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    if (wsConnect.match(action)) {
      socket = new WebSocket(action.payload);
      socket.onopen = () => store.dispatch(wsOpen());
      socket.onclose = () => store.dispatch(wsClose());
      socket.onerror = () => store.dispatch(wsError("WebSocket error"));
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          store.dispatch(wsMessage(data));
        } catch (e) {
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
