import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./pages/MyCalendar.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import AdminPanelPage from "./pages/AdminPanelPage.tsx";
import StudentsCalendar from "./pages/StudentsCalendar.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { EError } from "./static/types.ts";
import ErrorPage from "./pages/ErrorPage.tsx";
import Layout from "./pages/Layout.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/calendar/my" element={<MyCalendar />} />
          <Route path="/*" element={<ErrorPage code={EError.NotFound} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/" element={<StudentsCalendar />} />
          <Route path="/calendar" element={<StudentsCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
