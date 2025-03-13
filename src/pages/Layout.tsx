import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the current page */}
      </main>
    </>
  );
}
