import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./pages/MyCalendar.tsx";
import NotFound from "./pages/NotFound.tsx";

import LoginPage from "./pages/LoginPage.tsx"
import RegistrationPage from "./pages/RegistrationPage.tsx"
import AdminPanelPage from "./pages/AdminPanelPage.tsx"
import StudentsCalendar from "./pages/StudentsCalendar.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calendar/my" element={<MyCalendar />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/" element={<StudentsCalendar />} />
        <Route path="/calendar" element={<StudentsCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
