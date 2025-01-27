import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { setFilteredItems, setPage } from "../data/dataSlice";
import { ICFilterState } from "./filterSlice.props";
import { Vehicle } from "../../../../Shared/types/Vehicle";

const initialState: ICFilterState = {
  search: "",
  type: "",
  level: "",
  nation: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setNation: (state, action: PayloadAction<string>) => {
      state.nation = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const applyFilters =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { filter } = getState();
    const { items, itemsPerPage } = getState().data;

    const filteredItems = items.filter((item: Vehicle) => {
      const matchesSearch =
        !filter.search ||
        item.title.toLowerCase().includes(filter.search.toLowerCase());
      const matchesType = !filter.type || item.type.title === filter.type;
      const matchesLevel =
        !filter.level || item.level.toString() === filter.level;
      const matchesNation =
        !filter.nation || item.nation.title === filter.nation;

      return matchesSearch && matchesType && matchesLevel && matchesNation;
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    dispatch(setFilteredItems(filteredItems));
    dispatch(setPage(filteredItems.length > 0 ? Math.min(1, totalPages) : 1));
  };

export const { setSearch, setType, setLevel, setNation, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
