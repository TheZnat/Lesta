import { Middleware } from "@reduxjs/toolkit";
import {
  applyFilters,
  setSearch,
  setType,
  setLevel,
  setNation,
  resetFilters,
} from "./filterSlice";
import { RootState, AppDispatch } from "../../store";

const filterMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action);

    if (
      [
        setSearch.type,
        setType.type,
        setLevel.type,
        setNation.type,
        resetFilters.type,
      ].includes(action.type)
    ) {
      dispatch(applyFilters());
    }

    return result;
  };

export default filterMiddleware;
