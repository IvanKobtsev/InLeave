// import styles from "../styles/ProfilePage.module.scss";
// import Navbar from "../components/Navbar.tsx";
// import { getRoleText } from "../static.ts";
// import ToggleableTextInput from "../components/ToggleableTextInput.tsx";
import { useUser } from "../components/UserProvider.tsx";
import ErrorPage from "./ErrorPage.tsx";
import { EError } from "../types.ts";
// import { useForm } from "react-hook-form";

export type ProfileFormProps = {
  firstName: string;
  secondName: string;
  patronymic: string;
};

export type EducationFormProps = {
  basis: string;
  faculty: string;
  group: string;
};

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <ErrorPage code={EError.Unauthorized} />;
  }

  // const { register: registerProfile, handleSubmit: handleSubmitProfile } =
  //   useForm<ProfileFormProps>({
  //     defaultValues: {
  //       firstName: user.name.split(" ")[0],
  //       secondName: user.name.split(" ")[1],
  //       patronymic: user.name.split(" ")[2],
  //     },
  //   });
  // const { register: registerBudgetary, handleSubmit: handleSubmitBudgetary } =
  //   useForm<EducationFormProps>({
  //     defaultValues: {
  //       basis: user.budgetaryEducation?.basis,
  //       faculty: user.budgetaryEducation?.faculty,
  //       group: user.budgetaryEducation?.group,
  //     },
  //   });
  // const { register: registerPaid, handleSubmit: handleSubmitPaid } =
  //   useForm<EducationFormProps>({
  //     defaultValues: {
  //       basis: user.paidEducation?.basis,
  //       faculty: user.paidEducation?.faculty,
  //       group: user.paidEducation?.group,
  //     },
  //   });
  //
  // if (!user) {
  //   return <ErrorPage code={EError.Unauthorized} />;
  // }
  //
  // const onSubmitProfileData = (data) => {
  //   console.log(data);
  // };
  //
  // const onSubmitPaidEducationData = (data) => {
  //   console.log(data);
  // };
  //
  // const onSubmitBudgetaryEducationData = (data) => {
  //   console.log(data);
  // };

  return (
    <>
      {/*<Navbar />*/}
      {/*<div className={styles.ProfilePage}>*/}
      {/*  <div className={styles.profileInfo}>*/}
      {/*    <form onSubmit={handleSubmitProfile(onSubmitProfileData)}>*/}
      {/*      <div className={`${styles.name} ${styles.bottomLine}`}>*/}
      {/*        <ToggleableTextInput*/}
      {/*          labelText="Фамилия"*/}
      {/*          propName="firstName"*/}
      {/*          // registerProps={registerProfile}*/}
      {/*        />*/}
      {/*        <ToggleableTextInput*/}
      {/*          labelText="Имя"*/}
      {/*          propName="secondName"*/}
      {/*          // registerProps={registerProfile}*/}
      {/*        />*/}
      {/*        <ToggleableTextInput*/}
      {/*          labelText="Отчество"*/}
      {/*          propName="patronymic"*/}
      {/*          // registerProps={registerProfile}*/}
      {/*        />*/}
      {/*        /!*<input className={styles.submit} type="submit" />*!/*/}
      {/*      </div>*/}
      {/*      <div className={`${styles.roles} ${styles.bottomLine}`}>*/}
      {/*        Роли:{" "}*/}
      {/*        {user.roles.map((userRole, index) => (*/}
      {/*          <span key={index} className={styles.role}>*/}
      {/*            {getRoleText(userRole)}*/}
      {/*          </span>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </form>*/}
      {/*    <div className={`${styles.educations}`}>Образования</div>*/}
      {/*    {user.paidEducation !== undefined ? (*/}
      {/*      <form onSubmit={handleSubmitPaid(onSubmitPaidEducationData)}>*/}
      {/*        /!*<input type="submit" />*!/*/}
      {/*        <div*/}
      {/*          className={`${styles.otherInfoWrapper} ${styles.bottomLine}`}*/}
      {/*        >*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Основа"*/}
      {/*            propName="basis"*/}
      {/*            // registerProps={registerPaid}*/}
      {/*          />*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Факультет"*/}
      {/*            propName="faculty"*/}
      {/*            // registerProps={registerPaid}*/}
      {/*          />*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Группа"*/}
      {/*            propName="group"*/}
      {/*            // registerProps={registerPaid}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </form>*/}
      {/*    ) : null}*/}
      {/*    {user.budgetaryEducation !== undefined ? (*/}
      {/*      <form*/}
      {/*        onSubmit={handleSubmitBudgetary(onSubmitBudgetaryEducationData)}*/}
      {/*      >*/}
      {/*        /!*<input type="submit" />*!/*/}
      {/*        <div className={`${styles.otherInfoWrapper}}`}>*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Основа"*/}
      {/*            propName="basis"*/}
      {/*            // registerProps={registerBudgetary}*/}
      {/*          />*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Факультет"*/}
      {/*            propName="faculty"*/}
      {/*            // registerProps={registerBudgetary}*/}
      {/*          />*/}
      {/*          <ToggleableTextInput*/}
      {/*            labelText="Группа"*/}
      {/*            propName="group"*/}
      {/*            // registerProps={registerBudgetary}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </form>*/}
      {/*    ) : null}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
