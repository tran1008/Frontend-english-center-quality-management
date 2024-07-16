import React, { useState } from "react";
import classes from "./../screens/ClassPeriodicTest.module.css";
import { useNavigate } from "react-router-dom";

function TableCell({ score, date, isUpdating, onBlur }) {
  const [value, setValue] = useState(score);

  const changeHandler = (event) => {
    const _value = parseFloat(event.target.value);
    // console.log(_value);
    if (isNaN(_value)) setValue("");
    else if (_value >= 0 && _value <= 100) {
      setValue(_value);
    }
  };

  const blurHandler = (event) => {
    const _value = parseFloat(event.target.value);
    const date = event.target.dataset.date;
    if (isNaN(_value)) {
      setValue(0);
      onBlur(0, date);
    } else onBlur(_value, date);
  };

  return (
    <input
      value={value}
      data-date={date}
      readOnly={!isUpdating}
      type="number"
      className="text-center bg-light border-0 w-100"
      style={{ outline: "none" }}
      onBlur={blurHandler}
      onChange={changeHandler}
    />
  );
}

function PeriodicTableRow({ sdtt, isUpdating, isEditable, onChange }) {
  const navigate = useNavigate();
  const blurHandler = (value, date) => {
    onChange(value, sdtt.StudentID, date);
  };

  return (
    <tr key={sdtt.StudentID} style={{ cursor: "pointer" }}>
      {/* Student info */}
      <th
        onClick={() => {
          navigate("/students/" + sdtt._id);
        }}
      >
        <div className={classes.imgDiv}>
          <img
            style={{
              height: "40px",
              width: "40px",
              objectFit: "fixed"
            }}
            src={sdtt.ImageURL}
            alt={sdtt.Name}
          ></img>
        </div>
        <div>
          <p className="mb-0 text-nowrap fw-semibold">{sdtt.Name}</p>
          <p className="mb-0 fw-light">{sdtt.StudentID}</p>
        </div>
      </th>

      {/* Average Score */}
      <td>{sdtt.averageScore}</td>

      {/* Scores by days */}
      {sdtt.periTests.map((test) => (
        <td key={Math.random()}>
          <TableCell
            score={test.score}
            date={test.date}
            onBlur={blurHandler}
            isUpdating={isUpdating}
          />
        </td>
      ))}

      {/* Scores in updating column */}
      {isUpdating && (
        <td id="newTestCol">
          <input
            defaultValue={0}
            readOnly={!isEditable}
            className="text-center bg-light border-0 w-100"
            style={{ outline: "none" }}
          />
        </td>
      )}
    </tr>
  );
}

export default PeriodicTableRow;
