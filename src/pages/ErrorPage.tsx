import styles from "../styles/ErrorPages.module.scss";
import { EError, ErrorData } from "../types.ts";
import Navbar from "../components/Navbar.tsx";

interface ErrorPageProps {
  code: EError;
}

export default function ErrorPage({ code }: ErrorPageProps) {
  const error: ErrorData = {
    code: code,
    message: "Неизвестная ошибка!",
  };

  switch (code) {
    case 400:
      error.message = "Что-то пошло не так...";
      break;
    case 401:
      error.message = "Вы не авторизованы!";
      break;
    case 403:
      error.message = "У вас нет прав доступа к этой странице!";
      break;
    default:
    case 404:
      error.message = "Страница не найдена!";
      break;
    case 500:
      error.message = "Ошибка сервера!";
      break;
  }

  return (
    <>
      <Navbar />
      <div className={`${styles.ErrorPage}`}>
        <div className={`${styles.errorContainer}`}>
          <div className={`${styles.errorCode}`}>{error.code}</div>
          <div className={`${styles.errorMessage}`}>{error.message}</div>
        </div>
      </div>
    </>
  );
}
