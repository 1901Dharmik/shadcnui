import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../Sidebar";
// import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 ">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4  lg:gap-6 lg:p-6 bg-muted">
          {children}
          {/* <Outlet/> */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
