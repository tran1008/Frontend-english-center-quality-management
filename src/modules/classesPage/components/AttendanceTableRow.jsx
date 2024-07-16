import React from "react";
import classes from "./../screens/ClassPeriodicTest.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AttendanceTableRow({ sdta, isUpdating, isEditable, onChange }) {
  const navigate = useNavigate();
  const changeHandler = (event) => {
    onChange(event.target.checked, sdta.StudentID, event.target.dataset.date);
  };

  return (
    <tr key={sdta.StudentID} style={{ cursor: "pointer" }}>
      {/* Student info */}
      <th
        onClick={() => {
          navigate("/students/" + sdta._id);
        }}
      >
        <div className={classes.imgDiv}>
          <img
             style={{
              height: "40px",
              width: "40px",
              objectFit: "fixed"
            }}
            src={sdta.ImageURL}
            alt={sdta.Name}
          ></img>
        </div>
        <div>
          <p className="mb-0 text-nowrap fw-semibold">{sdta.Name}</p>
          <p className="mb-0 fw-light">{sdta.StudentID}</p>
        </div>
      </th>

      {/* Number of presents */}
      <td>{sdta.presents}</td>

      {/* Scores by days */}
      {sdta.attendances.map((att) => (
        <td key={Math.random()}>
          <input
            type="checkbox"
            defaultChecked={att.attendance}
            data-date={att.date}
            disabled={!isUpdating}
            onChange={changeHandler}
          />
        </td>
      ))}

      {/* Scores in updating column */}
      {isUpdating && (
        <td id="newAttendanceCol">
          <input
            type="checkbox"
            disabled={!isEditable}
            className="text-center"
          />
        </td>
      )}
    </tr>
  );
}

export default AttendanceTableRow;
