import { Outlet } from "react-router";
import { Navbar } from "../../../components";

export const LayoutDefault = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
