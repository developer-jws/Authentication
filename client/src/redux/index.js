import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./modules";
import { all } from "redux-saga/effects";
import { formSaga } from "./modules/form";
import { authSaga } from "./modules/auth";

const persistConfig = {
  key: "root",
  storage,
};

export function* rootSaga() {
  yield all([formSaga(), authSaga()]);
}

const enhancedReducer = persistReducer(persistConfig, rootReducer);
export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  enhancedReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
