import classes from "./UpdatePeriodic.module.css";
import ReactDOM from "react-dom";
import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment/moment";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const UpdatePeriodicModal = (props) => {
  const [date, setDate] = useState(new Date());
  const [tests, setTests] = useState(props.existingTests);
  const [testChosen, setTestChosen] = useState(tests ? tests[0] : null);
  const [score, setScore] = useState("");
  const [error, setError] = useState(null);

  const saveHandler = (event) => {
    event.preventDefault();
    if (testChosen === null) {
      setError("You must choose test before save");
    }
    if (!error) {
      props.onSave(date, testChosen, score);
    }
  };

  useEffect(() => {
    if (new Date(date).getTime() > new Date().getTime()) {
      setError("Date must be before today!");
    } else {
      const isExist = props.existingTests.find((test) => {
        return (
          new Date(test.Date).toDateString() === new Date(date).toDateString()
        );
      });
      if (isExist) {
        setError("Date already exist!");
        setTests([]);
      } else {
        const testsOfDate = props.tests.filter((test) => {
          console.log(
            new Date(test.Date).toDateString(),
            new Date(date).toDateString()
          );
          return (
            new Date(test.Date).toDateString() === new Date(date).toDateString()
          );
        });
        if (testsOfDate.length === 1) {
          setTestChosen(testsOfDate[0]);
          setError(null);
        }
        if (testsOfDate.length === 0) {
          setTestChosen("");
          setError("No test on this day!");
        }
        setTests(testsOfDate);
      }
    }
  }, [date]);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const testChangeHandler = (event) => {
    const _testChosen = tests.find((test) => (test._id = event.target.value));
    setTestChosen(_testChosen);
  };

  const scoreChangeHandler = (event) => {
    if (parseInt(score) <= 0 || parseInt(score) >= 990) {
      setError("Invalid score!");
    } else {
      setScore(event.target.value);
      setError(null);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onCloseModal} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          {props.tests.length === 0 && (
            <>
              <p>
                <span>There's no tests in this class. </span>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#0D6EFD",
                    border: "none",
                    padding: 0,
                    paddingLeft: "6px",
                  }}
                  size="small"
                  onClick={() => props.onAddTest()}
                >
                  Add test
                </button>
              </p>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  className="w-25 py-1 border-0 rounded-2 bg-black text-white"
                  onClick={props.onCloseModal}
                >
                  OK
                </button>
              </div>
            </>
          )}
          {props.tests.length > 0 && (
            <>
              <h4 className="text-center">Additional Request</h4>
              {error && (
                <p className="text-danger">
                  <span>{error}</span>
                  {error === "No test on this day!" && (
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "#0D6EFD",
                        border: "none",
                        padding: 0,
                        paddingLeft: "6px",
                      }}
                      size="small"
                      onClick={() => props.onAddTest(date)}
                    >
                      Add test
                    </button>
                  )}
                </p>
              )}

              <Form className="mt-2">
                <Form.Group className="mb-3">
                  <Form.Label>
                    Pick a date for the periodic test of your class:
                  </Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={moment(date).format("YYYY-MM-DD")}
                    onChange={dateChangeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Choose the periodic test:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={testChangeHandler}
                    value={testChosen?._id}
                    disabled={tests.length === 1}
                  >
                    {tests.map((test) => {
                      return (
                        <option value={test.ID} key={test.ID}>
                          {test.Title +
                            " - " +
                            new Date(test.Date).toDateString()}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <div className="d-flex gap-2 justify-content-end">
                  <button
                    className="w-25 py-1 border-0 rounded-2 bg-white text-dark text-opacity-50"
                    onClick={props.onCloseModal}
                  >
                    Cancle
                  </button>
                  <button
                    className="w-25 py-1 border-0 rounded-2 bg-black text-white"
                    onClick={saveHandler}
                  >
                    Save
                  </button>
                </div>
              </Form>
            </>
          )}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default UpdatePeriodicModal;
