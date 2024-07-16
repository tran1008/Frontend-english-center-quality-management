import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus } from "@fortawesome/fontawesome-free-solid";
import classes from "./ClassPeriodicTest.module.css";
import UpdateHomeworkModal from "../components/UpdatePeriodic";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import HomeworkTableRow from "../components/PeriodicTableRow";
import { useEffect } from "react";
import { useParams } from "react-router";
import StudentService, {
  StatisticsService,
  TestsService,
} from "../../../service.js";
import NoStudent from "../components/NoStudent";
import { faTimesCircle } from "@fortawesome/fontawesome-free-solid";
import Notification from "./../components/Notification";
import Loading from "../components/Loading";
import AddTest from "../components/AddTest";

function ClassHomework() {
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [homeworkTests, setHomeworkTests] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddingHomework, setIsAddingHomework] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddTest, setIsAddTest] = useState(false);
  const [defaultDateAddTest, setDefaultDateAddTest] = useState(new Date());

  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    setIsLoading(true);
    TestsService.getHomework(classId)
      .then((res) => {
        setTests(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });

    StudentService.getStudentsByClass(classId)
      .then((res) => {
        setStudents(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });

    StatisticsService.getHomework(classId)
      .then((res) => {
        setHomeworkTests(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  let studentTest = [];
  if (students.length > 0) {
    studentTest = students.map((student) => {
      let sumScores = 0;
      if (homeworkTests === null || homeworkTests.length === 0) {
        return {
          ...student,
          periTests: [],
          averageScore: 0,
        };
      } else {
        const periTests = homeworkTests
          .filter((homeworkTest) => {
            return homeworkTest.StudentID._id === student._id;
          })
          .map((homeworkTest) => {
            sumScores += homeworkTest.Score;
            return {
              date: homeworkTest.HomeworkID.Date,
              score: homeworkTest.Score,
            };
          });

        return {
          ...student,
          periTests,
          averageScore: (sumScores / periTests.length).toFixed(1),
        };
      }
    });
  }

  let existingTests = [];
  if (homeworkTests) {
    homeworkTests.forEach((homeworkTest) => {
      if (
        existingTests.findIndex((existingTest) => {
          // console.log(existingTest._id === homeworkTest.HomeworkID._id)
          return existingTest._id === homeworkTest.HomeworkID._id;
        }) === -1
      ) {
        existingTests.push(homeworkTest.HomeworkID);
      }
    });
  }

  const testDates = existingTests.map((test) => new Date(test.Date));

  const updateHandler = () => {
    setIsUpdating(true);
    setTimeout(() => {
      const newTestCol = document.getElementById("newTestCol");
      newTestCol.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const addHandler = () => {
    setIsAddingHomework(true);
  };

  const closeAddHandler = () => {
    setIsAddingHomework(false);
  };

  const saveHomeworkHandler = (date, testId, score) => {
    let newHomeworkTests = [];
    students.forEach((student) => {
      const newHomeworkTest = {
        Date: new Date(date).toISOString().split("T")[0],
        Score: 0,
        HomeworkID: testId,
        StudentID: student,
        RequiredScore: score === "" ? null : parseFloat(score),
      };
      newHomeworkTests.push(newHomeworkTest);
    });
    setHomeworkTests((prevTests) => [...prevTests, ...newHomeworkTests]);
    setIsAddingHomework(false);
    setIsEditable(true);
    setIsDeleting(false)
    setIsUpdating(true);
  };

  const updateHomeworkHandler = (value, studentID, date) => {
    const index = homeworkTests.findIndex((homeworkTest) => {
      return (
        homeworkTest.StudentID.StudentID === studentID &&
        homeworkTest.HomeworkID.Date === date
      );
    });

    const homeworkTestsCopy = [...homeworkTests];
    homeworkTestsCopy[index].Score = parseFloat(value);
    setHomeworkTests(homeworkTestsCopy);
  };

  const completeUpdateHandler = async () => {
    setIsEditable(false);
    setIsUpdating(false);
    await StatisticsService.postHomeworkTest(classId, homeworkTests);
  };

  const deleteHomeworkHandler = async (date) => {
    setHomeworkTests((prevHomework) => {
      return [...prevHomework].filter((homework) => {
        return (
          new Date(homework.Date).toDateString() !==
          new Date(date).toDateString()
        );
      });
    });
    await StatisticsService.deleteHomework(classId, date);
  };

  const saveTest = async (test) => {
    await TestsService.addHomeworkTest(test);
    setIsAddTest(false);
    TestsService.getHomework(classId)
      .then((res) => {
        setTests(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });
  };

  const addTestHandler = (date) => {
    setDefaultDateAddTest(date);
    setIsAddingHomework(false);
    setIsAddTest(true);
  };

  return (
    <Container
      className="bg-white p-4 rounded-4"
      style={{
        borderRadius: "16px",
        padding: "24px",
        backgroundColor: "white",
        marginBottom: "16px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row className="align-items-center">
        <Col>
          <p className="mb-1" style={{ fontSize: "20px", fontWeight: 700 }}>
            Homework Tests
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Total number of homework test:
            <span className="fw-bold" style={{ color: "black" }}>
              {existingTests.length}
            </span>
          </p>
        </Col>
        <Col className="d-flex justify-content-end">
          {!isUpdating && students.length > 0 && (
            <button
              onClick={updateHandler}
              className="bg-primary d-flex align-items-center text-light py-2 px-3 rounded-2 text-decoration-none border-0"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className="ps-2">Update</span>
            </button>
          )}
          {isUpdating && (
            <button
              onClick={completeUpdateHandler}
              className="bg-primary d-flex align-items-center text-light py-2 px-3 rounded-2 text-decoration-none border-0"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span className="ps-2">Save</span>
            </button>
          )}
        </Col>
      </Row>

      {isLoading && <Loading isLoading={isLoading} />}

      {students.length > 0 && !isLoading && (
        <div className={classes["table-div"]} id="tableDiv">
          <Table
            bordered
            className={classes.table}
            hover
            style={{
              fontSize: 14,
              borderCollapse: "collapse",
              borderRadius: "1em",
              overflow: "hidden",
              borderColor: "#E5E7EB",
            }}
          >
            <thead>
              <tr class="text-uppercase text-secondary">
                <th>NAME</th>
                <th>AVERAGE</th>
                {testDates.map((date) => (
                  <>
                    <th key={Math.random()}>
                      <span style={{ marginRight: "4px" }}>
                        {date.getDate() + "/" + (date.getMonth() + 1)}
                      </span>
                      {isUpdating && (
                        <button onClick={() => deleteHomeworkHandler(date)}>
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      )}
                    </th>
                    {isDeleting && (
                      <Notification
                        message="Are you sure to delete this periodic tests results? This action can not be
              undone."
                        onCancelDelete={() => {
                          setIsDeleting(false);
                        }}
                        onAcceptDelete={() => deleteHomeworkHandler(date)}
                      />
                    )}
                  </>
                ))}
                {isUpdating && (
                  <th>
                    <button className="border-0 bg-light" onClick={addHandler}>
                      <FontAwesomeIcon icon={faPlus} color="blue" />
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {studentTest.map((sdtt) => (
                <HomeworkTableRow
                  key={Math.random()}
                  sdtt={sdtt}
                  isEditable={isEditable}
                  isUpdating={isUpdating}
                  onChange={updateHomeworkHandler}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {students.length === 0 && !isLoading && <NoStudent />}

      {isAddingHomework && (
        <UpdateHomeworkModal
          tests={tests || []}
          existingTests={existingTests}
          onCloseModal={closeAddHandler}
          onSave={saveHomeworkHandler}
          onAddTest={addTestHandler}
        />
      )}

      {isAddTest && (
        <AddTest
          onCloseModal={() => setIsAddTest(false)}
          onSave={saveTest}
          classId={students[0].ClassID}
          defaultDate={defaultDateAddTest}
        />
      )}
    </Container>
  );
}

export default ClassHomework;
