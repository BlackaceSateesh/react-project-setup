import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../AuthMain";
import RegisterForm from "../../components/auth/RegisterForm";
const Auth = () => {
  return (
    <>
      <Routes>
        {/* <Route path={AuthRoutes.LOGIN} element={"LOGIN"} /> */}
        <Route
          path={AuthRoutes.REGISTER}
          element={<AuthMain innerPage={<RegisterForm />} />}
        />
        <Route path="*" element={<AuthMain innerPage={<RegisterForm />} />} />
      </Routes>
    </>
  );
};

export default Auth;
