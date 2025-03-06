import Navbar from "../components/Navbar.tsx";
import styles from "../styles/AdminPanel.module.scss";
import { Link } from "react-router-dom";
import { EError, ERole } from "../types.ts";
import ErrorPage from "./ErrorPage.tsx";
import { useUser } from "../components/UserProvider.tsx";

export default function AdminPanelPage() {
  const { user } = useUser();

  if (!user || !user.roles.includes(ERole.Admin)) {
    return <ErrorPage code={EError.Forbidden} />;
  }

  return (
    <>
      <Navbar />
      <div className={styles.adminPanel}>
        <div className={styles.sideBar}>
          <div className={styles.profileSection}>
            <div className={styles.profileIcon}></div>

            <div className={styles.profileCaptionBlock}>
              <p className={styles.profileCaptionText}>Иванов Иван Иванович</p>
            </div>
          </div>
          <div className={styles.adminNavbar}>
            <Link
              to={"/admin"}
              id="MyCalendar"
              className={styles.adminPanelItem}
            >
              <div className={styles.adminPanelItemIcon}></div>
              <p className={styles.adminPanelItemText}>Панель Админа</p>
            </Link>
            <Link
              to={"/admin"}
              id="MyCalendar"
              className={styles.adminPanelItem}
            >
              <div className={styles.adminPanelItemIcon}></div>
              <p className={styles.adminPanelItemText}>Панель Админа</p>
            </Link>
            <Link
              to={"/admin"}
              id="MyCalendar"
              className={styles.adminPanelItem}
            >
              <div className={styles.adminPanelItemIcon}></div>
              <p className={styles.adminPanelItemText}>Панель Админа</p>
            </Link>
          </div>
        </div>

        <div className={styles.mainField}>
          <p className={styles.mainFieldTitle}>Назначение роли пользователю</p>
          <div className={styles.roleAssignment}>
            <input type="text" placeholder="Выберите пользователя..." />
            <select>
              <option value="">Выберите роль...</option>
              <option value="role1">Роль1</option>
              <option value="role2">Роль2</option>
              <option value="role3">Роль3</option>
            </select>
            <button className={styles.setRoleButton}>Назначить роль</button>
          </div>
        </div>
      </div>
    </>
  );
}
