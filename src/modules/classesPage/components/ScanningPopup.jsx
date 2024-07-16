import { Form } from "react-bootstrap";
import classes from "./UpdatePeriodic.module.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

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

const DUMMY_STUDENT_IDS = ["STD0334", "STD1097", "STD0280"];

const ScanningPopup = ({ onCancelScanning, onSaveScanning }) => {
  const [studentIdsString, setStudentIdsString] = useState("");
  const [studentIds, setStudentIds] = useState([]);

  useEffect(() => {
    let _studentIds = studentIdsString.trim().split(" ");
    _studentIds = [...new Set(_studentIds)];
    console.log(_studentIds);
    setStudentIds(_studentIds);
  }, [studentIdsString]);

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const valueReplace = value.replace(/ /g, "");
    if (valueReplace.length % 7 === 0) setStudentIdsString(value + " ");
    else setStudentIdsString(value);
  };

  const saveScanningHandler = (event) => {
    event.preventDefault();
    onSaveScanning(studentIds);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onCancelScanning} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Check in by scanning code
          </h3>
          <span style={{ color: "#1b64f2" }}>Scan codes</span> in student cards:
          <input
            placeholder="Scan codes into here..."
            value={studentIdsString}
            onChange={inputChangeHandler}
            style={{
              width: "100%",
              border: "1px solid #D1D5DB",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              borderRadius: "6px",
              padding: "12px 12px",
              marginTop: "4px",
            }}
          />
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="w-25 py-1 border-0 rounded-2 bg-white text-dark text-opacity-50"
              onClick={onCancelScanning}
            >
              Cancel
            </button>
            <button
              className="w-25 py-1 border-0 rounded-2 bg-black text-white"
              onClick={saveScanningHandler}
            >
              Save
            </button>
          </div>
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default ScanningPopup;
