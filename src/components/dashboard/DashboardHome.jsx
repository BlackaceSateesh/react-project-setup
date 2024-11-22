import "../../style/DashboardHome.css";
import { FaOpencart, FaUserAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import { HiMiniUserPlus } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import StickyHeadTable from "../ui/StickyHeadTable";
import SectionHeading from "../ui/SectionHeading";
const DashboardHome = () => {
  const cardData = [
    {
      name: "Total Users",
      icon: <FaUsers />,
      count: "3",
    },
    {
      name: "Active Users",
      icon: <FaUserAlt />,
      count: "3",
    },
    {
      name: "Total Investment",
      icon: <FaOpencart />,
      count: "3",
    },
    {
      name: "Total Income",
      icon: <BsCashCoin />,
      count: "3",
    },
  ];
  const topEarnersColumns = [
    { id: 'id', label: 'ID', minWidth: 120 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'total', label: 'Total Earnings', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    { id: 'referBonus', label: 'Refer Bonus', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    { id: 'levelBonus', label: 'Level Bonus', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    { id: 'matchingBonus', label: 'Matching Bonus', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    { id: 'rank', label: 'Rank', minWidth: 50, align: 'right' },
  ];
  
  const topEarnersRows = [
    {
      id: 'CS00001',
      name: 'CS DEMO',
      total: 499.90,
      referBonus: 499.9,
      levelBonus: 0,
      matchingBonus: 0,
      rank: 2,
    },
    {
      id: 'CS111859',
      name: 'MADHAN',
      total: 0.0,
      referBonus: 0,
      levelBonus: 0,
      matchingBonus: 0,
      rank: 3,
    },
    {
      id: 'CS136819',
      name: 'GAUTAM',
      total: 0.0,
      referBonus: 0,
      levelBonus: 0,
      matchingBonus: 0,
      rank: 3,
    },
  ];

  const recentActivationColumns = [
    { id: 'number', label: '#', minWidth: 50, align: 'center' },
    { id: 'memberId', label: 'Member ID', minWidth: 150 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'package', label: 'Package', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    { id: 'date', label: 'Date', minWidth: 200 },
  ];
  
  const recentActivationRows = [
    {
      number: 1,
      memberId: 'CS698233',
      name: 'DEMO',
      package: 4999,
      date: '14-03-2024 10:37pm',
    },
    {
      number: 2,
      memberId: 'CS00001',
      name: 'CS DEMO',
      package: 1,
      date: '20-02-2024 08:58pm',
    },
  ];
  
  
  return (
    <div className=" DashboardHome">
      <div className="top-container">
        <div className="inner-top">
          <span className="title">Make Your First Plan</span>
          <p>
            Purchase more than 5 plan and flat pairs, including Bitcoin,
            Ethereum and Litecoin
          </p>
          <Link className="register button-main" to={AuthRoutes.REGISTER}>
            <HiMiniUserPlus /> Add Users
          </Link>
        </div>
        <div className="cards-wrapper">
          {cardData?.map((e, i) => {
            return (
              <div key={`card${i}`} className="cardBox">
                <div className="content">
                  <h6 className="text-[14px] font-[600]">{e?.name}</h6>
                  <p className="text-[24px] font-[800]">{e?.count}</p>
                </div>
                <div className="text-[24px]">{e?.icon}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="box-container">
        <div className="box-head">
          <SectionHeading name={"Top Earners"} />
        </div>
        <StickyHeadTable rows={topEarnersRows} columns={topEarnersColumns} />
      </div>
      <div className="box-container">
        <div className="box-head">
          <SectionHeading name={"Recent Activation"} />
        </div>
        <StickyHeadTable rows={recentActivationRows} columns={recentActivationColumns} />
      </div>
    </div>
  );
};

export default DashboardHome;
