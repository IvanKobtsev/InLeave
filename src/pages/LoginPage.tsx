import Navbar from "../components/Navbar.tsx";
import styles from "../styles/Login.module.scss";
import { Link } from "react-router-dom";
import { ERole } from "../types.ts";

export default function LoginPage() {
  return (
    <>
      <Navbar currentRole={ERole.None} />
      <div className={styles.LoginForm}>
        <div className={styles.leftSide}>
          <div className={styles.textAndButton}>
            <p>Ещё нет аккаунта?</p>
            <Link
              to={"/registration"}
              id="MyCalendar"
              className={styles.button}
            >
              <button className={styles.leftSideButton}>Регистрация</button>
            </Link>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.blockForm}>
            <p className={styles.formTitle}>Вход</p>
            <p className={styles.formSubTitle}>Email</p>
            <input type="email" name="email" placeholder="Email" />
            <br />
            <p className={styles.formSubTitle}>Пароль</p>
            <input type="password" name="password" placeholder="Password" />
            <br />
            <button className={styles.rightSideButton}>Войти</button>
          </div>
        </div>
      </div>
    </>
  );
}
