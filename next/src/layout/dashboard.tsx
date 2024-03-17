import type { ReactNode } from "react";
import AppHead from "../components/AppHead";
import Navbar from "../components/NavBar";

type DashboardLayoutProps = {
  children: ReactNode;
  onReload?: () => void;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <>
      <AppHead />
      <Navbar />
      <main>
        <div className="min-w-screen min-h-screen">{props.children}</div>
      </main>
    </>
  );
}
