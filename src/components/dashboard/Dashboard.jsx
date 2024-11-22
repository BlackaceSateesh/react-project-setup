/* eslint-disable react/prop-types */

import "../../style/Dashboard.css";
import Sidemenu from "../sidemenu/Sidemenu";
import Header from "../header/Header";

const Dashboard = ({ innerPage }) => {
  return (
    <>
      <div className="Dashboard">
        <Header />
        <div className="flex">
          <Sidemenu />
          <section className="dashboard-inner">{innerPage}</section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
