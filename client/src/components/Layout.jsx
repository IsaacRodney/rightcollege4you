import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(51,195,165,.22),transparent_35%),linear-gradient(180deg,#07111f_0%,#020617_50%,#02030a_100%)]" />
      <div className="fixed inset-0 -z-10 bg-grid bg-[size:26px_26px] opacity-25" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
