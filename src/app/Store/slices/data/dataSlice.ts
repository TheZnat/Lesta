import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../../Shared/API/apolloClient";
import { GET_ALL_DATA } from "../../../../Shared/API/apiService";
import { paginate } from "../../../../Features/Pagination/utils/pagination";
import { ICDataSlice } from "./dataSlice.props";
import { Vehicle } from "../../../../Shared/types/Vehicle";

const initialState: ICDataSlice = {
  items: [],
  filteredItems: [],
  paginatedItems: [],
  isLoading: false,
  currentPage: 1,
  itemsPerPage: 30,
  dataVehicleType: [] as string[],
  dataVehicleNations: [] as string[],
  dataVehiclelevel: [] as number[],
};

export const fetchItems = createAsyncThunk(
  "data/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_ALL_DATA,
      });
      if (!data) {
        throw new Error("No data returned from the API");
      }
      return data.vehicles;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch items");
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.paginatedItems = paginate(
        state.filteredItems,
        state.currentPage,
        state.itemsPerPage
      );
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.paginatedItems = paginate(
        state.filteredItems,
        state.currentPage,
        action.payload
      );
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
      state.paginatedItems = paginate(
        state.filteredItems,
        state.currentPage,
        state.itemsPerPage
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.paginatedItems = paginate(
          action.payload,
          state.currentPage,
          state.itemsPerPage
        );

        const uniqueTypes = new Set<string>(
          action.payload.map((item: Vehicle) => item.type.title)
        );
        const uniqueNations = new Set<string>(
          action.payload.map((item: Vehicle) => item.nation.title)
        );
        const uniqueLevels = new Set<number>(
          action.payload.map((item: Vehicle) => item.level)
        );

        state.dataVehicleType = Array.from(uniqueTypes);
        state.dataVehicleNations = Array.from(uniqueNations);
        state.dataVehiclelevel = Array.from(uniqueLevels);
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Fetch error:", action.payload);
      });
  },
});

export const { setPage, setItemsPerPage, setFilteredItems } = dataSlice.actions;
export default dataSlice.reducer;
