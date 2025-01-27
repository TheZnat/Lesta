import React from "react";
import styles from "./Header.module.scss";
import Logo from "../../assets/logo_mk.svg";
import { IHeaderProps } from "./Header.props";

const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <div className={styles.headerBg}>
      <div className={styles.wrapper}>
        <div className={styles.logoArea}>
          <img src={Logo} alt="Логотип" className={styles.logo} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Header;
