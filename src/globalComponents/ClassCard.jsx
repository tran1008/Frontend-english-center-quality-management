import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../modules/loginPage/AuthContext";

function ClassCard({ classInfo, bgColor }) {
  const { user } = useAuthContext(); 

  const { ClassID, Name,NumberOfStudent, ScoreTarget, TeacherName, TermFrom, TermTo } =
    classInfo;
    const TermFromDate = new Date(TermFrom);
    const TermToDate = new Date(TermTo);

  const formatedDateFrom = `${TermFromDate.getDate()
    .toString()
    .padStart(2, "0")}/${(TermFromDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${TermFromDate.getFullYear().toString()}`;
  const formatedDateTo = `${TermToDate.getDate().toString().padStart(2, "0")}/${(
    TermToDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${TermToDate.getFullYear().toString()}`;
  
  let navigate = useNavigate();
  return (
    <Card
      key={ClassID}
      text={bgColor === "light" ? "dark" : "white"}
      style={{
        backgroundColor: bgColor,
        minHeight: "140px",
        cursor: "pointer",
      }}
      className="mb-3"
      onClick={user ==='admin' ? () => navigate(`/app/classes/${ClassID}/dashboard`) : undefined}
      >
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-book-open"
            style={{ width: "16px", marginTop: "-4px" }}
          />
          <Card.Title
            className="text-center"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            {" "}
            {Name}{" "}
          </Card.Title>
        </div>
        <Card.Text
          className="text-center"
          style={{ fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}
        >
          {TeacherName} | {NumberOfStudent} students
        </Card.Text>
        <Card.Text
          className="text-center"
          style={{ fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}
        >
          Target: {ScoreTarget}
        </Card.Text>
        <Card.Text
          className="text-center"
          style={{ fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}
        >
          {formatedDateFrom} - {formatedDateTo}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ClassCard;
