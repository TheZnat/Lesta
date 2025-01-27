import React from "react";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "../../app/Store/store";
import SearchInput from "../../Widgets/SearchInput/SearchInput";
import Dropdown from "../../Widgets/Dropdown/Dropdown";
import {
  resetFilters,
  setSearch,
  setLevel,
  setNation,
  setType,
  applyFilters,
} from "../../app/Store/slices/filterSlice/filterSlice";
import { Option } from "./Search.props";

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { dataVehicleType, dataVehicleNations, dataVehiclelevel } = useSelector(
    (state: RootState) => state.data
  );

  const {
    type: selectedType,
    level: selectedLevel,
    nation: selectedNation,
  } = useSelector((state: RootState) => state.filter);

  const handleChangeSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(applyFilters());
  };

  const handleChangeDropdownLevel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setLevel(event.target.value));
  };

  const handleChangeDropdownNations = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setNation(event.target.value));
  };

  const handleChangeDropdownType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setType(event.target.value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const optionsLevel: Option[] = Array.from(dataVehiclelevel as number[])
    .sort((a: number, b: number) => a - b)
    .map((item: number) => ({
      value: item,
      label: item,
      id: uuidv4(),
    }));

  const optionsNations: Option[] = dataVehicleNations.map((item: string) => ({
    value: item,
    label: item,
    id: uuidv4(),
  }));

  const optionsType: Option[] = dataVehicleType.map((item: string) => ({
    value: item,
    label: item,
    id: uuidv4(),
  }));

  return (
    <form className={styles.formArea}>
      <SearchInput setSearch={handleChangeSearch} />
      <div className={styles.secondInputArea}>
        <Dropdown
          id="dropdownlevel"
          name="Уровень"
          value={selectedLevel}
          handleChangeDropdown={handleChangeDropdownLevel}
          options={optionsLevel}
        />
        <Dropdown
          id="dropdownNations"
          name="Нация"
          value={selectedNation}
          handleChangeDropdown={handleChangeDropdownNations}
          options={optionsNations}
        />
        <Dropdown
          id="dropdownType"
          name="Класс"
          value={selectedType}
          handleChangeDropdown={handleChangeDropdownType}
          options={optionsType}
        />
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.bth} ${styles.bthAdd}`}
        >
          Сбросить
        </button>
      </div>
    </form>
  );
};

export default Search;
