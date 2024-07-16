import React from "react";
import { Outlet, useLocation, useParams } from "react-router";
import BreadCrumbs from "./BreadCrumbs";

function ClassesRoot() {
  let name;
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  if (params.className) name = params.className;
  else if (pathname.includes("add")) name = "New Class";
  else if (params.classId) name = params.classId;
  else name = "Class List";

  return (
    <div className="px-3 position-relative">
      <div>
        <BreadCrumbs />
        <h3 className="mb-3">
          <b>{name}</b>
        </h3>
      </div>
      <div>
        <Outlet />
      </div>
      <div id="backdrop" />
      <div id="overlays" />
    </div>
  );
}

export default ClassesRoot;
