import { BsCashCoin } from "react-icons/bs";
import { AuthenticatedRoutes, AuthRoutes } from "../Routes";
import { FaHome, FaUsers } from "react-icons/fa";
import { PiNetworkFill } from "react-icons/pi";

export const SidemenuContent = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    option: [
      {
        name: "Dashboard",
        link: AuthenticatedRoutes.HOME,
      },
    ],
  },
  {
    name: "Users",
    icon: <FaUsers />,
    option: [
      {
        name: "All Users",
        link: AuthenticatedRoutes.ALL_USERS,
      },
    {
        name: "Active Users",
        link: AuthenticatedRoutes.ACTIVE_USERS,
      },
    ],
  },
  {
    name: "Earnings",
    icon: <BsCashCoin />,
    option: [
      {
        name: "Total Earnings",
        link: AuthenticatedRoutes.TOTAL_EARNINGS,
      },
      {
        name: "Refer Bonus",
        link: AuthRoutes.REFER_BONUNS,
      },
      {
        name: "Level Bonus",
        link: AuthenticatedRoutes.LEVEL_BONUS,
      },
    ],
  },
  {
    name: "Networks",
    icon: <PiNetworkFill />,
    option: [
      {
        name: "Tree View",
        link: AuthenticatedRoutes.TREE_VIEW,
      },
    ],
  },
];
