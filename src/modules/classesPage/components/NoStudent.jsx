import React from 'react'
import { Link } from 'react-router-dom';

function NoStudent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{ marginTop: "16px" }}>There's no student in this class</p>
      <Link to="/students/new" style={{ textDecoration: "none" }}>
        Add student
      </Link>
    </div>
  );
}

export default NoStudent