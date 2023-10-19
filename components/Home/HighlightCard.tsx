import React from "react";
import styles from "/styles/common/HighlightCard.module.scss";

export const HighlightCard = ({ highlight, theme }: any) => {
  return (
    <div className={styles.highlight}>
      <h2 className={styles.title}>{highlight.title} &rarr;</h2>
      <p className={styles.info}>{highlight.subtitle}</p>
      <p className={styles.info}>{highlight.trailing}</p>
    </div>
  );
};

export default HighlightCard;
