import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../AuthMain";
import RegisterForm from "../../components/auth/RegisterForm";
import LoginForm from "../../components/auth/LoginForm";
const Auth = () => {
  return (
    <>
      <Routes>
        <Route
          path={AuthRoutes.LOGIN}
          element={<AuthMain innerPage={<LoginForm />} />}
        />
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
