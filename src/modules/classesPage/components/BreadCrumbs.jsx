import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";

export const routes = [
  { path: "/classes", breadcrumb: "Class List" },
  { path: "/students", breadcrumb: "Student List" },
  { path: "/classes/add", breadcrumb: "New Class" },
  { path: "/classes/:className", breadcrumb: "Class Detail" },
  { path: "/classes/:className/dashboard", breadcrumb: "Dashboard" },
  { path: "/classes/:className/attendant", breadcrumb: "Attendant" },
  { path: "/classes/:className/periodic-test", breadcrumb: "Periodic Test" },
  { path: "/classes/:className/homework", breadcrumb: "Homework" },
];

function BreadCrumbs() {
  const breadcrumbs = useReactRouterBreadcrumbs(routes);

  return (
    <nav className="d-flex pt-3">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <div key={Math.random()}>
          <Link
            key={match.pathname}
            to={match.pathname}
            className="me-3"
            style={{
              textDecoration: "none",
              color: "#1B64F2",
              fontSize: "14px"
            }}
          >
            {breadcrumb}
          </Link>
          {!(index === breadcrumbs.length - 1) && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="me-3"
              style={{ fontSize: "10px", marginTop: "6px", color: "#888" }}
            ></FontAwesomeIcon>
          )}
        </div>
      ))}
    </nav>
  );
}

export default BreadCrumbs;
