import styles from "../styles/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../static/fetches.ts";
import { EError, LoginFormValues } from "../static/types.ts";
import ErrorPage from "./ErrorPage.tsx";
import { useMutation } from "@tanstack/react-query";
import { isUnauthorized } from "../static/functions.ts";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  if (!isUnauthorized()) {
    return <ErrorPage code={EError.BadRequest} />;
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: () => {
      alert("Invalid login credentials!");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <>
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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.rightSide}>
          <div className={styles.blockForm}>
            <p className={styles.formTitle}>Вход</p>
            <p className={styles.formSubTitle}>Email</p>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="Email"
            />
            <br />
            <p className={styles.formSubTitle}>Пароль</p>
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="Password"
            />
            <br />
            <button className={styles.rightSideButton}>Войти</button>
          </div>
        </form>
      </div>
    </>
  );
}
