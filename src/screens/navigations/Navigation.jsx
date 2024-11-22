/* eslint-disable no-constant-condition */
import { BrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Authenticate from "./Authenticate";

const Navigation = () => {
  return (
    <>
      <BrowserRouter>{false ? <Authenticate /> : <Auth />}</BrowserRouter>
    </>
  );
};

export default Navigation;
