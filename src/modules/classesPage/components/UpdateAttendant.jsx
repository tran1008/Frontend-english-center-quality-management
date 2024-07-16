import classes from "./UpdatePeriodic.module.css";
import ReactDOM from "react-dom";
import { Form } from "react-bootstrap";
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
  const [error, setError] = useState(null);

  const saveHandler = (event) => {
    event.preventDefault();
    if (!error) {
      props.onSave(date);
    }
  };

  const dateChangeHandler = (event) => {
    const dateChosen = event.target.value;
    setDate(dateChosen);

    if (new Date(dateChosen).getTime() > new Date().getTime()) {
      setError("Date must be before today!");
    } else {
      const isExist = props.existingDates.find((date) => {
        return new Date(date).toDateString() === new Date(dateChosen).toDateString();
      });
      if (isExist) {
        setError("Date already exist!");
      } else {
        setError(null)
        setDate(dateChosen);
      }
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
          <h4 className="text-center">Additional Request</h4>
          {error && <p className="text-danger">{error}</p>}
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
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default UpdatePeriodicModal;
