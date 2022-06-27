import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Button } from "../../ComponentIndex";
import styles from "./SideBar.module.scss";
import goncarLogo from "../../../assets/images/goncar-logo.png";
import { Icon } from "@iconify/react";
import roundDashboard from "@iconify/icons-ic/round-dashboard";
import filePersonFill from "@iconify/icons-bi/file-person-fill";
import personBadgeFill from "@iconify/icons-bi/person-badge-fill";
import baselinePayments from "@iconify/icons-ic/baseline-payments";
import roundAdminPanelSettings from "@iconify/icons-ic/round-admin-panel-settings";
import roundSettings from "@iconify/icons-ic/round-settings";
import roundGroups from "@iconify/icons-ic/round-groups";
import roundMenu from "@iconify/icons-ic/round-menu";

const SideBar = ({ navigation }) => {
  const maxWidth768px = useMediaQuery("(max-width:768px");
  const [click, setClick] = useState(true);
  const navItems = useRef();

  function RenderIcon(icon) {
    if (icon === "roundDashboard")
      return <Icon icon={roundDashboard} color="white" height="24" />;
    else if (icon === "filePersonFill")
      return <Icon icon={filePersonFill} color="white" height="24" />;
    else if (icon === "personBadgeFill")
      return <Icon icon={personBadgeFill} color="white" height="24" />;
    else if (icon === "baselinePayments")
      return <Icon icon={baselinePayments} color="white" height="24" />;
    else if (icon === "roundAdminPanelSettings")
      return <Icon icon={roundAdminPanelSettings} color="white" height="24" />;
    else if (icon === "roundSettings")
      return <Icon icon={roundSettings} color="white" height="24" />;
    else if (icon === "roundGroups")
      return <Icon icon={roundGroups} color="white" height="24" />;
    else console.log("ERROR finding icon from SideBar: " + icon);
  }

  function RenderHorizontalItems() {
    return (
      <>
        <div className={styles["SideBar__logo-with-bg"]}>
          <img src={goncarLogo} alt="GSTA logo" />
        </div>
        <h1>GSTA</h1>
        <Icon
          icon={roundMenu}
          color="white"
          height="38"
          className={styles["SideBar--Menu"]}
          onClick={handleClick}
        />
      </>
    );
  }

  function handleClick() {
    setClick((prev) => {return !prev;});
    if (click) {
      navItems.current.style.opacity = "1";
      navItems.current.style.top = "5.2rem";
    }
    else {
      navItems.current.style.top = "-600%";
      navItems.current.style.opacity = "0";
    }
  }

  return (
    <>
      <nav className={styles["SideBar"]}>
        {maxWidth768px ? RenderHorizontalItems() : null}
        <div className={styles["horizontal_navbar"]} ref={navItems}>
          <div className={styles["SideBar__main"]}>
            {maxWidth768px ? null : (
              <div className={styles["SideBar__logo-with-bg"]}>
                <img src={goncarLogo} alt="GSTA logo" />
              </div>
            )}
            <ul className={styles["SideBar__nav-list"]}>
              {navigation.map((nav) => {
                return (
                  <li className={styles["nav-link"]} key={nav.shortLabel}>
                    <Link to={nav.route}>
                      {RenderIcon(nav.icon)}
                      {nav.shortLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            label="Sign Out"
            type="button"
            variant="SignOut"
            icon="logoutIcon"
            iconSize="24"
          />
        </div>
      </nav>
    </>
  );
};

export default SideBar;
