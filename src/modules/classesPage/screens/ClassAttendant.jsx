import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus } from "@fortawesome/fontawesome-free-solid";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import classes from "./ClassPeriodicTest.module.css";
import UpdateAttendantModal from "../components/UpdateAttendant";
import { useEffect } from "react";
import { useParams } from "react-router";
import StudentService, { StatisticsService } from "../../../service.js";
import AttendanceTableRow from "../components/AttendanceTableRow";
import NoStudent from "../components/NoStudent";
import { faTimesCircle } from "@fortawesome/fontawesome-free-solid";
import { faQrcode } from "@fortawesome/fontawesome-free-solid";
import Notification from "../components/Notification";
import ScanningPopup from "../components/ScanningPopup";
import Loading from "../components/Loading";

function ClassAttendant() {
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddingAttendant, setIsAddingAttendant] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanningDisable, setIsScanningDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    setIsLoading(true);
    StudentService.getStudentsByClass(classId)
      .then((res) => {
        setStudents(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });

    StatisticsService.getAttendances(classId)
      .then((res) => {
        setAttendances(res.data.ResponseResult.Result);
      })
      .catch((err) => {
        throw err;
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  let studentAttendance = [];
  if (students.length > 0) {
    studentAttendance = students.map((student) => {
      let presents = 0;
      if (attendances === null) {
        return {
          ...student,
          attendances: [],
          presents: 0,
        };
      } else {
        const _attendances = attendances
          .filter((attendance) => {
            return attendance.StudentID._id === student._id;
          })
          .map((attendance) => {
            if (attendance.Attendance === true) presents++;
            return {
              date: attendance.Date,
              attendance: attendance.Attendance,
            };
          });

        return {
          ...student,
          attendances: _attendances,
          presents,
        };
      }
    });
  }

  let existingDates = [];
  if (attendances) {
    attendances.forEach((attendance) => {
      if (
        existingDates.findIndex((date) => {
          return (
            new Date(date).getTime() === new Date(attendance.Date).getTime()
          );
        }) === -1
      ) {
        existingDates.push(new Date(attendance.Date));
      }
    });
  }
  useEffect(() => {
    if (
      existingDates.findIndex(
        (date) => date.toDateString() === new Date().toDateString()
      ) >= 0
    ) {
      setIsScanningDisable(true);
    } else {
      setIsScanningDisable(false);
    }
  }, [existingDates]);

  const updateHandler = () => {
    setIsUpdating(true);
    setTimeout(() => {
      const newCheckCol = document.getElementById("newAttendanceCol");
      newCheckCol.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const addHandler = () => {
    setIsAddingAttendant(true);
  };

  const closeAddHandler = () => {
    setIsAddingAttendant(false);
  };

  const saveAttendanceHandler = (date) => {
    let newAttandances = [];
    students.forEach((student) => {
      const newAttandance = {
        Date: new Date(date).toISOString().split("T")[0],
        Attendance: false,
        StudentID: student,
      };
      newAttandances.push(newAttandance);
    });
    setAttendances((prevAttendances) => [
      ...prevAttendances,
      ...newAttandances,
    ]);
    setIsAddingAttendant(false);
    setIsEditable(true);
    setIsUpdating(true);
  };

  const updateAttendanceHandler = (value, studentID, date) => {
    const index = attendances.findIndex((attendance) => {
      return (
        attendance.StudentID.StudentID === studentID &&
        new Date(attendance.Date).toDateString() ===
          new Date(date).toDateString()
      );
    });

    const attendancesCopy = [...attendances];
    attendancesCopy[index].Attendance = value;
    setAttendances(attendancesCopy);
    console.log(attendances);
  };

  const completeUpdateHandler = async () => {
    setIsEditable(false);
    setIsUpdating(false);
    await StatisticsService.postAttendances(classId, attendances);
  };

  const deleteAttendanceHandler = async (date) => {
    setAttendances((prevAttendances) => {
      return [...prevAttendances].filter((attendance) => {
        return (
          new Date(attendance.Date).toDateString() !==
          new Date(date).toDateString()
        );
      });
    });
    await StatisticsService.deleteAttendance(classId, date);
  };

  const saveScanningHandler = async (studentIds) => {
    console.log(studentIds);
    let newAttandances = [];
    const date = new Date();

    students.forEach((student) => {
      let newAttandance;
      if (studentIds.includes(student.StudentID)) {
        newAttandance = {
          Date: date,
          Attendance: true,
          StudentID: student,
        };
      } else {
        newAttandance = {
          Date: date,
          Attendance: false,
          StudentID: student,
        };
      }

      const index = attendances.findIndex((attendance) => {
        return (
          new Date(attendance.Date).toDateString() ===
            new Date(newAttandance.Date).toDateString() &&
          attendance.StudentID.StudentID === newAttandance.StudentID.StudentID
        );
      });

      console.log(index);

      if (index > -1) {
        const _attendances = attendances;
        if (_attendances[index].Attendance === false)
          _attendances[index].Attendance = newAttandance.Attendance;
        setAttendances(_attendances);
      } else {
        newAttandances.push(newAttandance);
      }
    });
    if (newAttandances.length > 0) {
      setAttendances((prevAttendances) => {
        return [...prevAttendances, ...newAttandances];
      });
    }
    setIsScanning(false);
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
            Attendant Checking
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Total number of occurred lessons:{" "}
            <span className="fw-bold" style={{ color: "black" }}>
              {existingDates.length}
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
            <>
              <button
                onClick={() => {
                  setIsScanning(true);
                }}
                className="bg-black d-flex align-items-center text-light py-2 px-3 rounded-2 text-decoration-none border-0 me-2"
                // disabled={isScanningDisable}
              >
                <FontAwesomeIcon icon={faQrcode} />
                <span className="ps-2">Scan Code</span>
              </button>
              <button
                onClick={completeUpdateHandler}
                className="bg-primary d-flex align-items-center text-light py-2 px-3 rounded-2 text-decoration-none border-0"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span className="ps-2">Save</span>
              </button>
            </>
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
                <th style={{ maxWidth: "50px" }}>NAME</th>
                <th>PRESENT</th>
                {existingDates.map((date) => (
                  <>
                    <th key={Math.random()}>
                      <span style={{ marginRight: "4px" }}>
                        {date.getDate() + "/" + (date.getMonth() + 1)}
                      </span>
                      {/* Style will be customized later */}
                      {isUpdating && (
                        <button onClick={() => setIsDeleting(true)}>
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      )}
                    </th>
                    {isDeleting && (
                      <Notification
                        message="Are you sure to delete this attendance? This action can not be
              undone."
                        onCancelDelete={() => {
                          setIsDeleting(false);
                        }}
                        onAcceptDelete={() => {
                          deleteAttendanceHandler(date);
                          setIsDeleting(false);
                        }}
                      />
                    )}
                  </>
                ))}

                {isUpdating && (
                  <th>
                    <button className="border-0 bg-light" onClick={addHandler}>
                      <FontAwesomeIcon icon={faPlus} color="dark" />
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {studentAttendance.map((sdta) => (
                <AttendanceTableRow
                  key={Math.random()}
                  sdta={sdta}
                  isEditable={isEditable}
                  isUpdating={isUpdating}
                  onChange={updateAttendanceHandler}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {students.length === 0 && !isLoading && <NoStudent />}

      {isAddingAttendant && (
        <UpdateAttendantModal
          existingDates={existingDates}
          onCloseModal={closeAddHandler}
          onSave={saveAttendanceHandler}
        />
      )}

      {isScanning && (
        <ScanningPopup
          onCancelScanning={() => {
            setIsScanning(false);
          }}
          onSaveScanning={saveScanningHandler}
        />
      )}
    </Container>
  );
}

export default ClassAttendant;
