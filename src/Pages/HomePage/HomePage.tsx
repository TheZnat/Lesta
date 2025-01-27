import React from "react";
import styles from "./HomePage.module.scss";
import Header from "../../Widgets/Header/Header";
import Search from "../../Features/Search/Search";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import CardList from "../../Features/CardList/CardList";
import Pagination from "../../Features/Pagination/Pagination";

const HomePage: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.data);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <div className={styles.customLoader}></div>
      </div>
    );

  return (
    <div className={styles.list}>
      <Header>
        <Search />
      </Header>
      <CardList />
      <Pagination />
    </div>
  );
};

export default HomePage;
