import styles from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ERole } from "../types.ts";

interface NavbarProps {
  currentRole: ERole;
}

export default function Navbar({ currentRole }: NavbarProps) {
  const [isAccountButtonsHidden, setIsAccountButtonsHidden] = useState(true);

  const menuRef = useRef<HTMLButtonElement>(null);

  let linkToCalendar = (
    <Link to={"/calendar/my"} id="MyCalendar" className={styles.button}>
      Мой календарь
    </Link>
  );

  let profileName = "Иванов Иван Иванович";

  let profileMenuButton = (
    <button
          ref={menuRef}
          onClick={() => setIsAccountButtonsHidden(!isAccountButtonsHidden)}
          id="Profile"
          className={`${styles.profileButton} ${styles.button} ${isAccountButtonsHidden ? "" : styles.active}`}
        >
          <div className={styles.profileIcon}></div>
          {profileName}
    </button>
  )

  switch (currentRole) {
    case ERole.Teacher:
    case ERole.Dean:
    case ERole.Admin:
      linkToCalendar = (
        <Link to={"/calendar"} id="MyCalendar" className={styles.button}>
          Календарь пропусков
        </Link>
      );
      break;
    case ERole.None:
      linkToCalendar = (
      <p></p>
      );
      profileMenuButton = (
      <button
          ref={menuRef}
          id="Profile"
          className={`${styles.profileButton} ${styles.button} ${isAccountButtonsHidden ? "" : styles.active}`}
        >
          <div className={styles.profileIcon}></div>
          Вход
      </button>
      )
      break;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccountButtonsHidden(true);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.Navbar}>
      <Link to="/" className={styles.logoWrapper}>
        <div className={styles.logo}></div>
        <div className={styles.logoTitles}>
          <div className={styles.title}>
            In<span className={styles.titleBold}>Leave</span>
          </div>
          <div className={styles.subTitle}>Когда ушёл на рыбалку</div>
        </div>
      </Link>
      <div className={styles.buttonsWrapper}>
        {linkToCalendar}
        {profileMenuButton}
      </div>
      <div
        className={`${styles.accountButtonsWrapper} ${isAccountButtonsHidden ? styles.hidden : ""}`}
      >
        <Link
          to={"/account"}
          className={`${styles.button} ${styles.myAccountButton}`}
        >
          Аккаунт
        </Link>
        <button
          id="SignOutButton"
          className={`${styles.button} ${styles.signOutButton}`}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
