import store from "../services/store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { TConstructorActions } from "../services/actions/constructors-ingredients";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TIngModalActions } from "../services/actions/ingredient-modal";
import { TOrderModalActions } from "../services/actions/order-modal";
import { TRoutingActions } from "../services/actions/routing";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export type TAppActions =
  | TConstructorActions
  | TIngredientsActions
  | TIngModalActions
  | TOrderModalActions
  | TRoutingActions;

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TAppActions;

export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Action,
  TRootState,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;


