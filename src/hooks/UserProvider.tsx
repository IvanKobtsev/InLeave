import { createContext, ReactNode, useContext, useState } from "react";
import { ERole, User } from "../static/types.ts";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: "u1",
    name: "Иванов Иван Иванович",
    email: "iivanov@mail.ru",
    roles: [ERole.Student, ERole.Teacher],
    budgetaryEducation: {
      id: "e1",
      faculty: `НОЦ "ВИТШ"`,
      group: "972301",
      basis: "бюджет",
    },
    // paidEducation: {
    //   id: "e1",
    //   faculty: `НОЦ "ВИТШ"`,
    //   group: "972301",
    //   basis: "платная",
    // },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
