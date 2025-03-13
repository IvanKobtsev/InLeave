import styles from "../styles/Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ERole, User } from "../static/types.ts";
import { clickOutside } from "../hooks/clickOutside.ts";
import { useUser } from "../hooks/UserProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { catchPhrases } from "../static/constants.ts";
import { getProfile } from "../static/fetches.ts";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationFn: getProfile,
    onSuccess: (data: User) => {
      data = { ...data, roles: [ERole.Student] };
      setUser(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsAccountButtonsHidden(true);
    }
  }

  clickOutside(handleClickOutside);

  useEffect(() => {
    userMutation.mutate();
  }, []);

  const randomPhrase = catchPhrases[Math.floor(Math.random() * 40)],
    catchPhrase = useRef(randomPhrase);

  const [isAccountButtonsHidden, setIsAccountButtonsHidden] = useState(true);

  const menuRef = useRef<HTMLButtonElement>(null);

  let linkToCalendar = <></>,
    profileMenuButton = <></>;

  if (user !== null && user !== undefined) {
    profileMenuButton = (
      <button
        ref={menuRef}
        onClick={() => setIsAccountButtonsHidden(!isAccountButtonsHidden)}
        id="Profile"
        className={`${styles.profileButton} ${styles.button} ${isAccountButtonsHidden ? "" : styles.active}`}
      >
        <div className={styles.profileIcon}></div>
        {user.name}
      </button>
    );

    for (const currentRole of user.roles) {
      switch (currentRole) {
        case ERole.Teacher:
        case ERole.Dean:
        case ERole.Admin:
          linkToCalendar = (
            <>
              {linkToCalendar}
              <Link to={"/calendar"} id="calendar" className={styles.button}>
                Календарь пропусков
              </Link>
            </>
          );
          break;
        case ERole.Student:
          linkToCalendar = (
            <>
              {linkToCalendar}
              <Link
                to={"/calendar/my"}
                id="MyCalendar"
                className={styles.button}
              >
                Мой календарь
              </Link>
            </>
          );

          break;
      }
    }
  }

  if (user === undefined || user?.roles.length === 0) {
    linkToCalendar = <p></p>;
    profileMenuButton = (
      <button
        onClick={() => {
          navigate("/login");
        }}
        ref={menuRef}
        id="Profile"
        className={`${styles.profileButton} ${styles.button} ${isAccountButtonsHidden ? "" : styles.active}`}
      >
        <div className={styles.profileIcon}></div>
        Вход
      </button>
    );
  }

  let mainLinkPath = "/";

  if (user?.roles && user.roles.length == 1) {
    switch (user?.roles[0]) {
      case ERole.Teacher:
        mainLinkPath = "/calendar";
        break;
      case ERole.Student:
        mainLinkPath = "/calendar/my";
        break;
    }
  } else if (user === undefined || user?.roles.length === 0) {
    mainLinkPath = "/login";
  }

  return (
    <div className={styles.Navbar}>
      <Link to={mainLinkPath} className={styles.logoWrapper}>
        <div className={styles.logo}></div>
        <div className={styles.logoTitles}>
          <div className={styles.title}>
            In<span className={styles.titleBold}>Leave</span>
          </div>
          <div className={styles.subTitle}>Когда ушёл{catchPhrase.current}</div>
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
