import styles from "../styles/Navbar.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ERole, NotificationData, User } from "../static/types.ts";
import { clickOutside } from "../hooks/clickOutside.ts";
import { useUser } from "../hooks/UserProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { catchPhrases } from "../static/constants.ts";
import { getProfile } from "../static/fetches.ts";
import { stringToEnum } from "../static/functions.ts";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    userMutation.mutate();
  }, [location.pathname]);

  const userMutation = useMutation({
    mutationFn: getProfile,
    onSuccess: (data: User) => {
      for (let i = 0; i < data.roles.length; i++) {
        data.roles[i] = stringToEnum(ERole, data.roles[i])!;
      }
      setUser(data);
    },
    onError: (error) => {
      if (error.name !== "TypeError") {
        notify(error.name);
      }
    },
  });

  console.log("user by the NAVBAR", user);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const [notificationData, setNotificationData] = useState<NotificationData>({
    text: "Нам нечего сообщить",
    isShown: false,
  });

  const notify = (text: string) => {
    setNotificationData({
      text: text,
      isShown: true,
    });
  };

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsAccountButtonsHidden(true);
    }
  }

  clickOutside(handleClickOutside);

  const randomPhrase = catchPhrases[Math.floor(Math.random() * 40)],
    catchPhrase = useRef(randomPhrase);

  const [isAccountButtonsHidden, setIsAccountButtonsHidden] = useState(true);

  const menuRef = useRef<HTMLButtonElement>(null);

  let links = <></>,
    profileMenuButton = <></>,
    mainLinkPath = "/";

  if (user !== null) {
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

    if (user.roles !== undefined) {
      if (
        user.roles.includes(ERole.Teacher) ||
        user.roles.includes(ERole.Admin) ||
        user.roles.includes(ERole.Dean)
      ) {
        links = (
          <>
            {links}
            <Link to={"/calendar"} id="calendar" className={styles.button}>
              Календарь пропусков
            </Link>
          </>
        );
      }

      if (user.roles.includes(ERole.Student)) {
        links = (
          <>
            {links}
            <Link to={"/calendar/my"} id="MyCalendar" className={styles.button}>
              Мой календарь
            </Link>
          </>
        );
      }
    }
  }

  if (user === null) {
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
  } else {
  }

  if (user !== null && user.roles !== undefined && user.roles.length === 1) {
    switch (user?.roles[0]) {
      case ERole.Teacher:
        mainLinkPath = "/calendar";
        break;
      case ERole.Student:
        mainLinkPath = "/calendar/my";
        break;
    }
  } else if (user === null) {
    mainLinkPath = "/login";
  }

  return (
    <>
      <div
        className={`${styles.Notification} ${notificationData.isShown ? styles.show : ""}`}
      >
        <div className={styles.icon}></div>
        <div className={styles.text}>{notificationData.text}</div>
        <div
          className={styles.close}
          onClick={() => {
            setNotificationData({ ...notificationData, isShown: false });
          }}
        ></div>
      </div>
      <div className={styles.Navbar}>
        <Link to={mainLinkPath} className={styles.logoWrapper}>
          <div className={styles.logo}></div>
          <div className={styles.logoTitles}>
            <div className={styles.title}>
              In<span className={styles.titleBold}>Leave</span>
            </div>
            <div className={styles.subTitle}>
              Когда ушёл{catchPhrase.current}
            </div>
          </div>
        </Link>
        <div className={styles.buttonsWrapper}>
          {links}
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
            onClick={() => logOut()}
          >
            Выйти
          </button>
        </div>
      </div>
    </>
  );
}
