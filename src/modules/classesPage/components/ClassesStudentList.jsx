import { React, useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import deleteSVG from "../../../assets/images/global/delete.svg";
import editSVG from "../../../assets/images/global/edit.svg";
import Loading from "../components/Loading";
import NoData from "./NoData";
import startOfDay from "date-fns/fp/startOfDay/index.js";

function mathRound(number) {
  return Math.round(number * 100) / 100;
}

const ClassesStudentList = ({ std }) => {
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1600);

    if (std) {
      setIsLoading(false);
    }
  }, [std]);

  console.log("render :", std)
  return (
    <div style={{ borderRadius: "0px" }}>
      <Row>
        <Col>
          <p style={{ fontWeight: 700, fontSize: "20px" }}>Student list</p>
        </Col>
      </Row>

      {isLoading && <Loading isLoading={isLoading} />}

      {std?.length > 0 && !isLoading && (
        <Table
          bordered
          hover
          style={{
            fontSize: 14,
            borderCollapse: "collapse",
            overflow: "hidden",
            borderColor: "#E5E7EB",
          }}
        >
          <thead>
            <tr className="text-uppercase text-secondary">
              <th>Name</th>
              <th>Phone</th>
              <th>Attendant</th>
              <th>Periodic Test</th>
              <th>Homework</th>
              <th>Evaluation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {std.map((_std) => (
              <tr
                key={_std.id}
                onClick={() => {
                  navigate(`/app/students/${_std.Student._id}`);
                }}
              >
                <td>
                  <Container>
                    <Link
                      // to={"/students"}
                      className="text-decoration-none text-dark"
                    >
                      <Row>
                        <Col md="auto">
                          <Image
                            src={_std.Student.ImageURL}
                            roundedCircle="true"
                            style={{
                              height: "40px",
                              width: "40px",
                              objectFit: "fixed",
                            }}
                          ></Image>
                        </Col>
                        <Col>
                          <b>{_std.Student.Name}</b>
                          <br />
                          {_std.Student.StudentID}
                        </Col>
                      </Row>
                    </Link>
                  </Container>
                </td>
                <td>{_std.Student.PhoneNumber}</td>
                <td>
                  {_std.TotalResult.TotalReport !== 0
                    ? mathRound(
                        parseFloat(
                          _std.TotalResult.TotalAttented /
                            _std.TotalResult.TotalReport
                        ) * 100
                      ).toString()
                    : "0"}
                  %<br />
                  <label style={{ color: "#6B7280" }}>
                    Present: {_std.TotalResult.TotalAttented}/
                    {_std.TotalResult.TotalReport}
                  </label>
                </td>
                <td>
                  {_std.TotalResult.TotalTestScoreRequired !== 0
                    ? mathRound(
                        parseFloat(
                          _std.TotalResult.TotalTestScore /
                            _std.TotalResult.TotalTestScoreRequired
                        ) * 100
                      ).toString()
                    : "0"}
                  %<br />
                  <label style={{ color: "#6B7280" }}>
                    Score: {_std.TotalResult.TotalTestScore}/
                    {_std.TotalResult.TotalTestScoreRequired}
                  </label>
                </td>
                <td>
                  {_std.TotalResult.TotalHomeworkScoreRequired !== 0
                    ? mathRound(
                        parseFloat(
                          _std.TotalResult.TotalHomeworkScore /
                            _std.TotalResult.TotalHomeworkScoreRequired
                        ) * 100
                      ).toString()
                    : "0"}
                  %<br />
                  <label style={{ color: "#6B7280" }}>
                    Score: {_std.TotalResult.TotalHomeworkScore}/
                    {_std.TotalResult.TotalHomeworkScoreRequired}
                  </label>
                </td>
                <td>
                  <h6>
                    {_std.TotalResult.Evaluation === "Good" && (
                      <Badge pill bg="success">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    )}
                    {_std.TotalResult.Evaluation === "Medium" && (
                      <Badge pill bg="warning">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    )}
                    {_std.TotalResult.Evaluation === "Not-Good" && (
                      <Badge pill bg="danger">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    )}
                    {_std.TotalResult.Evaluation === "Non" && (
                      <Badge pill bg="secondary">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    )}
                  </h6>
                </td>
                <td>
                  <button>
                    <img src={editSVG} alt="edit" />
                  </button>
                  <br></br>
                  <button>
                    <img src={deleteSVG} alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {std?.length === 0 && !isLoading && <NoData/>}
    </div>
  );
};

export default ClassesStudentList;
