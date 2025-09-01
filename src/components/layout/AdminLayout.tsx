import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <h2>ADMIN Layout component</h2>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
