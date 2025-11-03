import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

const enhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
