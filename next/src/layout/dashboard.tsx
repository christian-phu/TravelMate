import type { ReactNode } from "react";
import AppHead from "../components/AppHead";
import Navbar from "../components/NavBar";

type DashboardLayoutProps = {
  children: ReactNode;
  onReload?: () => void;
};

export default function DashboardLayout (props: DashboardLayoutProps) {
  return (
    <>
      <AppHead />
      <Navbar />
      <main className="bg-gradient-to-b from-slate-7 to-slate-3">
        <div className="min-w-screen min-h-screen">
          {props.children}
        </div>
      </main>
    </>
  );
};
