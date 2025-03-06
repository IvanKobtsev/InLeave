import styles from "../styles/AbsentPanel.module.scss";
import { FileData } from "../types.ts";

interface FileBlockProps {
  fileData: FileData;
  deleteHandler: (id: string) => void;
  downloadHandler: (id: string) => void;
}

export default function FileBlock({
  fileData,
  deleteHandler,
  downloadHandler,
}: FileBlockProps) {
  return (
    <div className={styles.absentDoc}>
      <div className={styles.absentDocActionsWrapper}>
        <div
          onClick={() => downloadHandler(fileData.id)}
          className={styles.absentDocDownload}
        ></div>
        <div
          onClick={() => deleteHandler(fileData.id)}
          className={styles.absentDocDelete}
        ></div>
      </div>
      {fileData.extension}
    </div>
  );
}
