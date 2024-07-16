import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import styled from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassList from "../components/ClassList";
import { TeacherService } from "../../../service.js";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import Stack from "react-bootstrap/Stack";
import moment from "moment";
import axios from "axios";

function calculateExperience(startDate) {
  const today = moment();
  const start = moment(startDate);
  const yearsOfExperience = today.diff(start, "years");
  return yearsOfExperience;
}

function TeacherDetail() {
  // Gọi API:
  const [teacher, setTeacher] = useState({});
  const [teacherClasses, setTeacherClasses] = useState([]);

  const { id } = useParams();
  console.log("StudentID: ", id);
  
  // useEffect(() => {
  //   TeacherService.get(id)
  //     .then((res) => {
  //       setTeacher(res.data.ResponseResult.Result);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TeacherService.get(id);
        const teacherData = response.data.ResponseResult.Result;
        setTeacher(teacherData);
  
        const classResponse = await axios.get(
          `http://localhost:3001/api/v1/class/teacherid/${teacherData._id}`
        );
        const classData = classResponse.data.ResponseResult.Result;
        setTeacherClasses(classData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [id]);
  
  //Format date:
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day}${","} ${year}`;
  };

  return (
    <>
      {/* Filter */}
      <Container>
        <Row>
          <Stack direction="horizontal" gap={2} className="mt-3">
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
              Home
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="me-3"
              style={{ fontSize: "10px", color: "#888" }}
            ></FontAwesomeIcon>
            <Link
              key="Home"
              to="/teachers"
              className="me-3"
              style={{
                textDecoration: "none",
                color: "#1B64F2",
                fontSize: "14px",
              }}
            >
              Teacher List
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="me-3"
              style={{ fontSize: "10px", color: "#888" }}
            ></FontAwesomeIcon>
            <Link
              key="Home"
              to=""
              className="me-3"
              style={{
                textDecoration: "none",
                color: "#1B64F2",
                fontSize: "14px",
              }}
            >
              Teacher Details
            </Link>
          </Stack>
        </Row>
        <h3 className="mb-3">
          <b>{teacher.Name}</b>
        </h3>
        <Row>
          <Col md={4}>
            <div className={`${styled["details1"]}`}>
              <p style={{ fontSize: "20px", fontWeight: 600 }}>Information</p>
              <div className={`${styled["avt_details"]}`}>
                <Image
                  src={teacher.ImageURL}
                  roundedCircle="true"
                  style={{
                    height: "64px",
                    width: "64px",
                    objectFit: "fixed"
                  }}
                ></Image>
                <div className={`${styled["name_details"]}`}>
                  <label style={{ fontSize: "16px", fontWeight: "600" }}>
                    {teacher.Name}
                  </label>
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>
                    ID: {teacher.TeacherID}
                  </label>
                </div>
              </div>
              <div className={`${styled["alot_details"]}`}>
                <div className={`${styled["icon_label"]}`}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-calendar"
                    style={{ color: "#6B7280", height: "14px" }}
                  />
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>

                    {/* {moment(teacher.DateOfBirth).format("MMMM Do, YYYY")} */}

                    {/* {teacher.DateOfBirth} */}
                    {`${formatDate(teacher.DateOfBirth)}`}

                  </label>
                </div>
                <div className={`${styled["icon_label"]}`}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-phone"
                    style={{ color: "#6B7280", height: "14px" }}
                  />
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>
                    {teacher.PhoneNumber}
                  </label>
                </div>
                <div className={`${styled["icon_label"]}`}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-envelope"
                    style={{ color: "#6B7280", height: "14px" }}
                  />
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>
                    {teacher.Email}
                  </label>
                </div>
                <div className={`${styled["icon_label"]}`}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-graduation-cap"
                    style={{ color: "#6B7280", height: "14px" }}
                  />
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>
                    {teacher.Certificate}
                    {/* {teacher.Score} */}
                  </label>
                </div>
                <div className={`${styled["icon_label"]}`}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-star"
                    style={{ color: "#6B7280", height: "14px" }}
                  />
                  <label style={{ color: "#6B7280", fontSize: "14px" }}>
                    {calculateExperience(teacher.StartedDate)} year
                  </label>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8}>
          <ClassList teacherClasses={teacherClasses} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default TeacherDetail;
