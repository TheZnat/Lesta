import React from "react";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import { setPage } from "../../app/Store/slices/data/dataSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const { filteredItems, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.data
  );

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`${styles.pageButton} ${
            currentPage === index + 1 ? styles.activePage : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
