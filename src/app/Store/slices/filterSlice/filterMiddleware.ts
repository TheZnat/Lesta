import { AnyAction, Middleware } from "@reduxjs/toolkit";
import {
  applyFilters,
  setSearch,
  setType,
  setLevel,
  setNation,
  resetFilters,
} from "./filterSlice";

const filterMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action);

    if (
      [setSearch, setType, setLevel, setNation, resetFilters].some(
        (actionCreator) => actionCreator.match(action)
      )
    ) {
      dispatch(applyFilters() as unknown as AnyAction);
    }

    return result;
  };
export default filterMiddleware;
