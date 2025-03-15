import styles from "../styles/ErrorPages.module.scss";
import { EError, ErrorData, LinkData } from "../static/types.ts";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ErrorPageProps {
  code: EError;
}

export default function ErrorPage({ code }: ErrorPageProps) {
  const navigate = useNavigate();

  const error: ErrorData = {
    code: code,
    message: "Неизвестная ошибка!",
  };

  let link: LinkData = {
    link: "/",
    text: "На главную",
  };

  useEffect(() => {
    if (code === EError.Unauthorized) {
      navigate("/login");
    }
  });

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
      error.message = "Ошибка сервера! Попробуйте позже.";
      break;
  }

  return (
    <>
      <div className={`${styles.ErrorPage}`}>
        <div className={`${styles.errorContainer}`}>
          <div className={`${styles.errorCode}`}>{error.code}</div>
          <div className={`${styles.errorMessage}`}>{error.message}</div>
          <Link to={link.link} className={styles.linkButton}>
            {link.text}
          </Link>
        </div>
      </div>
    </>
  );
}
