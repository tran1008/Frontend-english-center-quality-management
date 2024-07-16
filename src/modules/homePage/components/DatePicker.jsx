import React from "react";
import { useState } from "react";
import styled from "./styleHome.module.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { useEffect } from "react";
import { HomeService } from "../../../service";

function DatePicker(props) {
  const [visibleDate, setVisibilityDate] = useState(true);
  const [visibleMonth, setVisibilityMonth] = useState(false);

  
  const handleDateChange = (date) => {
    console.log("Date changed,", date)
    props.onChangeSelectedDate(date);
  };

 
  const onChange = (event) => {
    const value = event.target.value;
    props.onChangeSelectedType(value);
    //setSelectValue(value);
    if (value === "Date") {
      setVisibilityDate(true);
      setVisibilityMonth(false);
    } else if (value === "Month") {
      setVisibilityDate(false);
      setVisibilityMonth(true);
    } else {
      setVisibilityDate(false);
      setVisibilityMonth(false);
    }
  };

  return (
    <div className={`${styled["filterTime"]}`}>
      <select onChange={onChange} className={`${styled["dropDown"]}`}>
        <option defaultValue value="Date">
          Date
        </option>
        <option value="Month">Month</option>
        <option value="Period">Period</option>
      </select>

      {visibleDate && (
        <Flatpickr
          style={{ width: "90px" }}
          options={{
            enable: props.datesList,
            mode: "single",
          }}
          onChange={handleDateChange}
        />
      )}

      {visibleMonth && (
        <select
          name="Month"
          lassName={`${styled["filedDateMonth"]}`}
          onChange={(e) => {
            let selectedValue = e.currentTarget.value.split("-");
            console.log("month selected", selectedValue);
            if (selectedValue[0] !== "none") {
              console.log("changed value");
              props.onChangeSelectedMonth(selectedValue[0]);
            }
          }}
        >
          <option value={"none"}>select month</option>
          {props.monthsList.map((month) => (
            <option value={month}>{month}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DatePicker;
