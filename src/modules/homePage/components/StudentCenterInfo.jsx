import React from "react";
import AppCircleChart from "../../../globalComponents/CirlceChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import ListStudentView from "./ListView";
import AppCard from "../../../globalComponents/Card";

function StudentCenterInfo({timeInfo, topStudents, pieChartData }) {
  return (
    <div className="my-3">
      <Row>
        <Col xs={5}>
          <AppCard className="p-6 h-full">
            <p style={{ fontWeight: 700, fontSize: "20px" }}>Classify</p>
            <AppCircleChart pieChartData={pieChartData} />
            <p className="text-center font-bold">Time: {timeInfo}</p>
          </AppCard>
        </Col>
        <Col>
          <AppCard className="p-6">
            {" "}
            <p style={{ fontWeight: 700, fontSize: "20px" }}>Top students</p>
            <ListStudentView topStudents={topStudents} />
          </AppCard>
        </Col>
      </Row>
    </div>
  );
}

export default StudentCenterInfo;
