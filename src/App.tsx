import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./pages/MyCalendar.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/LoginPage.tsx"
import RegistrationPage from "./pages/RegistrationPage.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calendar/my" element={<MyCalendar />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

      </Routes>
    </Router>
  );
}

export default App;
