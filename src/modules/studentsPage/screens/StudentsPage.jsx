import React, { useState, useEffect } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import StudentsTable from "../components/StudentsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import StudentService from "../../../service.js";

function ClassesPage() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    retrieveStudents();
  }, []);

  const retrieveStudents = () => {
    StudentService.getStudentReportOverview()
      .then((response) => {
        console.log("Student List: ", response.data.ResponseResult.Result);
        setStudents(response.data.ResponseResult.Result);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };

  return (
    <Container style={{ fontSize: "14px", marginTop: "1px" }} className="mx-1">
      <Row className="align-items-center">
        <Col>
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
              to=""
              className="me-3"
              style={{
                textDecoration: "none",
                color: "#1B64F2",
                fontSize: "14px",
              }}
            >
              Student List
            </Link>
          </Stack>
          <h3 className="mb-3">
            <b>Student List</b>
          </h3>
        </Col>
        <Col className="text-end" md="auto">
          <Link
            to="new"
            className="bg-primary text-light py-2 px-3 rounded-2 text-decoration-none"
            style={{ alignItems: "center" }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span className="ps-2" style={{ fontSize: "14px" }}>
              Add Student
            </span>
          </Link>
        </Col>
      </Row>
      <Row>
        <StudentsTable std={students} />
      </Row>
    </Container>
  );
}

export default ClassesPage;
