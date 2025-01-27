import React from "react";
import styles from "./Card.module.scss";
import { ICardProps } from "./Card.props";

const Card: React.FC<ICardProps> = ({ data }) => {
  return (
    <div className={styles.card} data-testid="card">
      <div className={styles.vehicleImgContainer}>
        <img
          className={styles.vehicleImg}
          src={data.icons.large || ""}
          alt="корабыль"
        />
        <img
          className={styles.vehicleNationFlag}
          src={data.nation.icons.large || ""}
          alt="флаг"
        />
        <div className={styles.specificationsInfo}>
          <div>{data.nation.title}</div>
          <div>Уровень {data.level}</div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.vehicleSubtitle}>
          <img src={data.type.icons.default} className={styles.vehicleIcon} />
          <p>{data.type.title}</p>
        </div>
        <h2 className={styles.vehicleTitle}>{data.title}</h2>
      </div>
      <div className={styles.vehicleDescription}>{data.description}</div>
    </div>
  );
};

export default Card;
