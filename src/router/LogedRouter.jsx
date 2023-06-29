import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/components";

export const LogedRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container ml-5">
        <Outlet />
      </div>
    </>
  );
};
