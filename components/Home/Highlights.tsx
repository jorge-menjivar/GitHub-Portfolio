import HighlightCard from "./HighlightCard";
import styles from "/styles/common/HighlightCard.module.scss";

export const Highlights = ({ theme }: any) => {
  const highlights = [
    {
      title: "",
      subtitle: "",
      trailing: "",
    },
    {
      title: "",
      subtitle: "",
      trailing: "",
    },
    {
      title: "",
      subtitle: "",
      trailing: "",
    },

    {
      title: "",
      subtitle: "",
      trailing: "",
    },
    {
      title: "",
      subtitle: "",
      trailing: "",
    },
    {
      title: "",
      subtitle: "",
      trailing: "",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.highlights_grid}>
        {highlights.map((highlight: any) => (
          <HighlightCard
            key={highlight.title}
            theme={theme}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
};
