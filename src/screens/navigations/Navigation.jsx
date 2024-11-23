/* eslint-disable no-constant-condition */
import { BrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Authenticate from "./Authenticate";

const Navigation = () => {
  const token = localStorage.getItem("authToken")
  return (
    <>
      <BrowserRouter>{token ? <Authenticate /> : <Auth />}</BrowserRouter>
    </>
  );
};

export default Navigation;
