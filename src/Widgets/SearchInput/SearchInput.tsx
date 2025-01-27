import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import { ISearchInputProps } from "./SearchInput.props";

const SearchInput: React.FC<ISearchInputProps> = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    setSearch(value);
  };

  const handleButtonClick = () => {
    setSearch(inputValue.trim());
  };

  return (
    <div className={styles.mainInputArea}>
      <input
        type="text"
        placeholder="Поиск по имени..."
        className={styles.SearchInput}
        value={inputValue}
        onChange={handleSearch}
      />
      <button
        type="button"
        className={`${styles.bth} ${styles.bthSearch}`}
        onClick={handleButtonClick}
      >
        Найти корабль
      </button>
    </div>
  );
};

export default SearchInput;
