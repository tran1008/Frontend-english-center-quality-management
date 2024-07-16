import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "../components/DatePicker"
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import AppLineChart from "../../../globalComponents/LineChart";
import StudentCenterInfo from "../components/StudentCenterInfo";
import ClassList from "../../../globalComponents/ClassList";
import moment from "moment-timezone";
import { useAuthContext } from '../../loginPage/AuthContext';

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeService } from "../../../service";

function HomePage() {
  const [topStudents, setTopStudent] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectValue, setSelectValue] = useState("Date");
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [isPeriod, setIsPeriod] = useState(false)
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  
  const onChangeSelectedType = (newValue)=>{
    console.log("here changed selected", newValue);
    if (newValue === "Period") {
      setIsPeriod(true)
    }
    setSelectValue(newValue);
  }
  const onChangeSelectedDate = (newValue)=>{
    console.log("date selected:", newValue[0]);
    const dateString = moment(newValue[0])
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD");
    console.log("dateString:", dateString);
    setMonth(null)
    setIsPeriod(false);
    setDate(dateString);
    
  }
  const onChangeSelectedMonth = (newValue)=>{
    setDate(null)
    setIsPeriod(false);
    console.log("new month:", newValue);
    setMonth(newValue);
  }

  useEffect(()=>{
    const getData = async ()=>{
      const { dates, months } = await HomeService.getDateCenter();
      const [students, classes] = await Promise.all([
        HomeService.getTopStudent(),
        HomeService.getClass(),
      ]);  
      console.log("dates list: ", dates)
      console.log("months list: ", months);
      setDatesList(dates);
      setMonthsList(months);
      //set defaut value for date
      setDate(dates[dates.length-1])
      setClasses(classes)
      setTopStudent(students);
    }
    getData();
  },[])

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const [centerReport, pieChartReport] = await Promise.all([
          HomeService.getLineChartData({ month: month, date: date, isPeriod: isPeriod }),
          HomeService.getPieChartData({month: month, date: date, isPeriod: isPeriod})
        ]);
      
        setPieChartData(pieChartReport);
        setLineChartData(centerReport);
      } catch (e) {
        console.log(e);
      }
    };
    getHomeData();
  }, [ date, isPeriod, month]);

  const { user } = useAuthContext(); 
console.log("aaaaa: ",user);

  return (
    <Container fluid="md">
      
      <Row className="mt-3">
        <Col>
          <Link
            key="Home"
            to="/"
            className="me-3"
            style={{
              textDecoration: "none",
              color: "#1B64F2",
              fontSize: "14px",
            }}
          >
            {/* Home */}
          </Link>
          <h3 className="mb-3">
            <b>Dashboard</b>
          </h3>
        </Col>
        <Col>
          <DatePicker
            onChangeSelectedType={onChangeSelectedType}
            onChangeSelectedDate={onChangeSelectedDate}
            onChangeSelectedMonth={onChangeSelectedMonth}
            datesList={datesList}
            monthsList={monthsList}
          />
        </Col>
      </Row>
      <AppLineChart data={lineChartData} />

      <StudentCenterInfo
        timeInfo={
          date
            ? moment(date).format("YYYY-MM-DD")
            : month
            ? `month ${month}`
            : "Total"
        }
        pieChartData={pieChartData}
        topStudents={topStudents}
      />
      <ClassList classes={classes} />
    </Container>
  );
}

export default HomePage;
