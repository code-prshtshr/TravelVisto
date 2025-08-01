// @ts-check

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React, { useRef } from "react";
import { Link } from "react-router";
import Navitems from "./Navitems";

function mobilesidebar() {
  /** @type {React.MutableRefObject<SidebarComponent|null>} */
  const sidebar = useRef(null);

  const toggleSidebar = () => sidebar.current?.toggle();

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>
        {/* @ts-ignore */}
        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-8" />
        </button>
        {/* @ts-ignore */}
        <SidebarComponent
          ref={(Sidebar) => (sidebar.current = Sidebar)}
          created={() => sidebar.current?.hide()}
          closeOnDocumentClick={true}
          showBackdrop={true}
          type="over"
        >
          <Navitems handleClick={toggleSidebar} />
        </SidebarComponent>
      </header>
    </div>
  );
}

export default mobilesidebar;
