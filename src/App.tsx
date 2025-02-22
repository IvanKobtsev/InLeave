import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./pages/MyCalendar.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calendar/my" element={<MyCalendar />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
