import styles from "../styles/AbsentPanel.module.scss";
import {
  AbsentData,
  EAbsentStatus,
  ERole,
  FileData,
  StudentAbsents,
} from "../types.ts";
import {
  downloadFile,
  getAbsentStatusText,
  getDateDifferenceInDays,
  getFileCountText,
  getFileExtension,
  getFullDateText,
} from "../static.ts";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import FileBlock from "./FileBlock.tsx";

interface AbsentPanelProps {
  student: StudentAbsents;
  absent: AbsentData | null;
  watchingRole: ERole;
  hasUnsavedChangesSetter: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
  hasUnsavedChanges: boolean;
  deleteHandler?: () => void;
  saveHandler?: () => void;
  handlePanelClose?: () => void;
}

export default function AbsentPanel({
  student,
  absent,
  watchingRole,
  hasUnsavedChangesSetter,
  hasUnsavedChanges,
  deleteHandler,
  saveHandler,
  handlePanelClose,
}: AbsentPanelProps) {
  const absentStatusStyles = [styles.pending, styles.accepted, styles.rejected];
  const [_, setRefresher] = useState(0);

  function refresh() {
    setRefresher((refresher) => refresher + 1);
  }

  function selectDocumentsToUpload() {}

  function setDocumentsToUpload(event: ChangeEvent<HTMLInputElement>) {
    if (absent !== null && event.target.files !== null) {
      if (absent.documents !== undefined) {
        absent.documents = [
          ...absent.documents,
          ...Array.from(event.target.files).map(
            (file, index): FileData => ({
              id: (absent.documents!.length + index).toString(),
              extension: getFileExtension(file.name),
              file: file,
            }),
          ),
        ];
      } else {
        absent.documents = [
          ...Array.from(event.target.files).map(
            (file, index): FileData => ({
              id: index.toString(),
              extension: getFileExtension(file.name),
              file: file,
            }),
          ),
        ];
      }

      hasUnsavedChangesSetter(true);
      refresh();
    }
  }

  let absentActions = <></>;

  if (absent !== null) {
    switch (watchingRole) {
      case ERole.Student:
        absentActions = (
          <div className={styles.absentActionsWrapper}>
            <div onClick={deleteHandler} className={styles.absentCancel}>
              Удалить пропуск
            </div>
            <div
              onClick={saveHandler}
              className={`${styles.absentAccept} ${hasUnsavedChanges ? null : styles.absentGrayedOut}`}
            >
              Сохранить
            </div>
          </div>
        );
        break;
      case ERole.Dean:
        absentActions = (
          <div className={styles.absentActionsWrapper}>
            {absent.status === EAbsentStatus.Rejected ? (
              <div
                className={`${styles.absentCancel} ${styles.absentCancelled}`}
              >
                Отклонено
              </div>
            ) : (
              <div className={styles.absentCancel}>Отклонить</div>
            )}
            {absent.status === EAbsentStatus.Accepted ? (
              <div
                className={`${styles.absentAccept} ${styles.absentAccepted}`}
              >
                Принято
              </div>
            ) : (
              <div className={styles.absentAccept}>Принять</div>
            )}
          </div>
        );
        break;
    }
  }

  const deleteFileHandler = (id: string) => {
    if (absent !== undefined && absent!.documents !== undefined) {
      absent!.documents.forEach((file: FileData, index) => {
        if (file.id === id) {
          absent!.documents!.splice(index, 1);
        }
      });
      hasUnsavedChangesSetter(true);
      refresh();
    }
  };

  const downloadFileHandler = (id: string) => {
    if (absent !== undefined && absent!.documents !== undefined) {
      absent!.documents.forEach((file: FileData) => {
        if (file.id === id) {
          downloadFile(file.file);
        }
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {absent !== null ? (
        <motion.div
          initial={{
            minWidth: "0px",
            maxWidth: "0px",
          }}
          animate={{
            minWidth: "400px",
            maxWidth: "400px",
          }}
          exit={{
            minWidth: "0px",
            maxWidth: "0px",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${styles.AbsentPanel}`}
        >
          <div className={styles.AbsentSectionsWrapper}>
            <div
              className={`${styles.AbsentPanelHeader} ${styles.absentSection}`}
            >
              Пропуск студента
              <button
                className={styles.AbsentPanelClose}
                onClick={handlePanelClose}
              ></button>
            </div>
            <div
              className={`${styles.studentInfoSection} ${styles.absentSection}`}
            >
              <div className={styles.studentName}>{student.name}</div>
              <div className={styles.studentOtherInfo}>
                Факультет: {student.faculty}
              </div>
              <div className={styles.studentOtherInfo}>
                Группа: {student.group}
              </div>
            </div>
            <div
              className={`${styles.absentInfoSection} ${styles.absentSection}`}
            >
              <div className={styles.absentInfoHeader}>
                <div
                  className={`${styles.absentStatus} ${absentStatusStyles[absent.status]}`}
                >
                  {getAbsentStatusText(absent.status)}
                </div>
              </div>
              <div className={styles.absentInfoWrapper}>
                Дата начала:
                <div className={styles.absentInfoText}>
                  {getFullDateText(absent.from)}
                </div>
              </div>
              <div className={styles.absentInfoWrapper}>
                Дата конца:
                <div className={styles.absentInfoText}>
                  {getFullDateText(absent.to)}
                </div>
              </div>
              <div className={styles.absentInfoWrapper}>
                Итого дней:
                <div className={styles.absentInfoText}>
                  {`${getDateDifferenceInDays(absent.from, absent.to) + 1} д.`}
                </div>
              </div>
              {absent.description !== undefined ? (
                <div
                  className={`${styles.absentInfoWrapper} ${absent.description.length > 18 ? styles.opened : ""}`}
                >
                  Примечание:
                  <div className={styles.absentInfoDescription}>
                    {`"${absent.description}"`}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={`${styles.absentDocsSection} ${styles.absentSection}`}
            >
              <div className={styles.absentDocumentsTitle}>
                Подтверждение{" "}
                <div className={styles.absentDocsCounter}>
                  {" "}
                  (
                  {absent.documents !== undefined
                    ? getFileCountText(absent.documents!.length)
                    : "0 файлов"}
                  )
                </div>
              </div>
              <div className={styles.absentDocumentsWrapper}>
                {absent.documents !== undefined
                  ? Array.from(absent.documents).map((fileData, index) => (
                      <FileBlock
                        key={index}
                        fileData={fileData}
                        deleteHandler={deleteFileHandler}
                        downloadHandler={downloadFileHandler}
                      />
                    ))
                  : ""}
              </div>
              {watchingRole === ERole.Student ? (
                <>
                  <label
                    htmlFor="fileUploader"
                    className={styles.uploadDocument}
                    onClick={selectDocumentsToUpload}
                  >
                    Прикрепить
                    {absent.documents !== undefined &&
                    absent.documents!.length > 0
                      ? " доп. "
                      : " "}
                    документ
                  </label>
                  <input
                    id="fileUploader"
                    type="file"
                    multiple
                    hidden
                    className={styles.absentFileUploader}
                    onChange={setDocumentsToUpload}
                  />
                </>
              ) : null}
            </div>
            {absentActions}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
