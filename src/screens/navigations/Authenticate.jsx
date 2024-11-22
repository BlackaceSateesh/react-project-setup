import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import Dashboard from "../../components/dashboard/Dashboard";
import DashboardHome from "../../components/dashboard/DashboardHome";
import AllUsers from "../../components/users/AllUsers";
import TotalEarnings from "../../components/earnings/TotalEarnings";
import BinaryTree from "../../components/networks/TreeView";
import ActiveUsers from "../../components/users/ActiveUsers";
const Authenticate = () => {
  return (
    <>
      <Routes>
        <Route
          path={AuthenticatedRoutes.HOME}
          element={<Dashboard innerPage={<DashboardHome />} />}
        />
        <Route
          path={AuthenticatedRoutes.ALL_USERS}
          element={<Dashboard innerPage={<AllUsers />} />}
        />
        <Route
          path={AuthenticatedRoutes.ACTIVE_USERS}
          element={<Dashboard innerPage={<ActiveUsers />} />}
        />
        <Route
          path={AuthenticatedRoutes.TOTAL_EARNINGS}
          element={<Dashboard innerPage={<TotalEarnings />} />}
        />
        <Route
          path={AuthenticatedRoutes.TREE_VIEW}
          element={<Dashboard innerPage={<BinaryTree />} />}
        />
        <Route path="*" element={<Dashboard innerPage={<DashboardHome />} />} />
      </Routes>
    </>
  );
};

export default Authenticate;
