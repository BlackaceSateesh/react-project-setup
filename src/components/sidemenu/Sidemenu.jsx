import { useState } from "react";
import "../../style/sidemenu/Sidemenu.css";
import { HiOutlineMinus } from "react-icons/hi";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { SidemenuContent } from "../../constants/contents/SidemenuContent";
import { Link } from "react-router-dom";

const Sidemenu = () => {
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  const handleAccordionToggle = (key) => {
    setActiveAccordionKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <div className="Sidemenu">
      <div className="links">
        {SidemenuContent?.map((menu, index) =>
          menu.option?.length > 1 ? (
            <div key={`item-${index}`} className="accordion-item">
              <button
                className={`menuList ${
                  activeAccordionKey === index ? "active" : ""
                }`}
                onClick={() => handleAccordionToggle(index)}
              >
                  <div className="icon">{menu.icon ? menu.icon : <HiOutlineMinus />}</div>
                  <span className="text">{menu.name}</span>
                  <div className="angle-icon">
                    {activeAccordionKey === index ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
              </button>
              {activeAccordionKey === index && (
                <div className="list-body">
                  <ul>
                    {menu.option?.map((opt, optIndex) => (
                      <li key={`option-${optIndex}`}>
                        <Link
                          to={opt.link}
                          className={`menuList ${
                            activeLink === opt.link ? "active" : ""
                          }`}
                          onClick={() => handleLinkClick(opt.link)}
                        >
                          <div className="icon">
                            <HiOutlineMinus />
                          </div>
                          <span className="text">{opt.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={`item-${index}`}
              to={menu.option[0].link}
              className={`menuList ${
                activeLink === menu.option[0].link ? "active" : ""
              }`}
              onClick={() => handleLinkClick(menu.option[0].link)}
            >
              <div className="icon">{menu.icon ? menu.icon : <HiOutlineMinus />}</div>
              <span className="text">{menu.name}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Sidemenu;
