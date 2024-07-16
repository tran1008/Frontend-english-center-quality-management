import classes from "./UpdatePeriodic.module.css";
import ReactDOM from "react-dom";

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

const Notification = ({ message, onCancelDelete, onAcceptDelete }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onCancelDelete} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div>
            <p>
              {message}
            </p>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="w-25 py-1 border-0 rounded-2 bg-white text-dark text-opacity-50"
              onClick={onCancelDelete}
            >
              Cancle
            </button>
            <button
              className="w-25 py-1 border-0 rounded-2 bg-danger text-white"
              onClick={onAcceptDelete}
            >
              Yes
            </button>
          </div>
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Notification;
