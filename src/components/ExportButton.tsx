import styles from "../styles/CommonCalendar.module.scss";

interface ExportButtonProps {
  exportAbsents: () => void;
}

export default function ExportButton({ exportAbsents }: ExportButtonProps) {
  return (
    <button className={`${styles.exportAbsents}`} onClick={exportAbsents}>
      Экспорт
    </button>
  );
}
