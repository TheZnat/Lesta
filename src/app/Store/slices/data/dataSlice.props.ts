import { Vehicle } from "../../../../Shared/types/Vehicle";

export interface ICDataSlice {
  items: Vehicle[];
  filteredItems: Vehicle[];
  paginatedItems: Vehicle[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  dataVehicleType: string[];
  dataVehicleNations: string[];
  dataVehiclelevel: number[];
}
