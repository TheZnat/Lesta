import React from "react";
import styles from "./CardList.module.scss";
import Card from "../../Widgets/Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import { Vehicle } from "../../Shared/types/Vehicle";

const CardList: React.FC = () => {
  const { paginatedItems } = useSelector((state: RootState) => state.data);

  if (paginatedItems.length === 0) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <div className={styles.wrapper}>
      {paginatedItems.map((vehicle: Vehicle) => (
        <Card data={vehicle} key={vehicle.id} />
      ))}
    </div>
  );
};

export default CardList;
