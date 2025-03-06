import Navbar from "../components/Navbar.tsx";
import styles from "../styles/Registration.module.scss";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  return (
    <>
      <Navbar />
      <div className={styles.RegistrationForm}>
        <div className={styles.leftSide}>
          <div className={styles.textAndButton}>
            <p>Уже есть аккаунт?</p>
            <Link to={"/login"} id="MyCalendar" className={styles.button}>
              <button className={styles.leftSideButton}>Вход</button>
            </Link>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.blockForm}>
            <p className={styles.formTitle}>Регистрация</p>
            <p className={styles.formSubTitle}>Email</p>
            <input type="email" name="email" placeholder="Email" />
            <br />
            <p className={styles.formSubTitle}>Пароль</p>
            <input type="password" name="password" placeholder="Password" />
            <br />
            <p className={styles.formSubTitle}>Повтор пароля</p>
            <input
              type="password"
              name="password"
              placeholder="Password again"
            />
            <br />
            <p className={styles.formSubTitle}>Фамилия</p>
            <input type="text" name="password" placeholder="Second name" />
            <br />
            <p className={styles.formSubTitle}>Имя</p>
            <input type="text" name="password" placeholder="First name" />
            <br />
            <p className={styles.formSubTitle}>Отчество</p>
            <input type="text" name="password" placeholder="Third name" />
            <br />
            <button className={styles.rightSideButton}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
