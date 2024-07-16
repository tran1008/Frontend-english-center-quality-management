import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Row,
  Table,
  Container,
  Badge,
  Image,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "./styleStd.module.css";
import deleteSVG from "../../../assets/images/global/delete.svg";
import editSVG from "../../../assets/images/global/edit.svg";
import searchSVG from "../../../assets/images/global/search.svg";
import axios from 'axios';
import Loading from "../../classesPage/components/Loading";

function mathRound(number){
  return Math.round((number) * 100)/100
}

function StudentsTable({ std }) {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // Handle Delete Student
  const [studentList, setStudentList] = useState({});
  const [studentDeleted, setStudentDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/v1/students');
      setStudentList(result.data);
       setIsLoading(false);
    };
    fetchData();
  }, [studentDeleted]);

  const deleteHandler = async (Id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/students/${Id}`);
      console.log(response.data.message);
      if (Array.isArray(studentList)) {
        setStudentList(studentList.filter((stdd) => stdd._id !== Id));
      }
      setStudentDeleted(prevState => !prevState);
      window.location.reload();
      //alert('Xóa học viên thành công!');
    } 
    catch (error) {
      console.log(error);
      alert('Đã có lỗi xảy ra khi xóa học viên!');
    }
  };

  const handleDelete = (id) => {
    setClassToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (classToDelete) {
      deleteHandler(classToDelete);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setClassToDelete(null);
    setShowConfirmation(false);
  };

  // Handle Filter by Type Class
  const [active, setActive] = useState(false);
  const stdFilter = std;

  const onChange = (event) => {
    const value = event.target.value;
    setFilClass(value);
    if (value === "TC00" || value === "") {
      setActive(false);
      //setDisplayedStudents(std);
      return;
    }
    setActive(true);
    axios
      .get(
        `http://localhost:3001/api/v1/student-report/total?evaluation=${filEva}&classId=${value}`
      )
      .then((response) => {
        console.log('Filter by Class: ',response.data.ResponseResult.Result);
        setDisplayedStudents(response.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [active_2, setActive_2] = useState(false);

  const onChange_2 = (event) => {
    const value = event.target.value;
    setFilEva(value);
    if (value === "None" || value === "") {
      setActive_2(false);
      return;
    }
    setActive_2(true);
    axios
      .get(
        `http://localhost:3001/api/v1/student-report/total?evaluation=${value}&classId=${filClass}`
      )
      .then((response) => {
        console.log('Filter by Evaluation: ',response.data.ResponseResult.Result);
        setDisplayedStudents(response.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [classes, setClasses] = useState([]);
  const [filClass, setFilClass] = useState("");
  const [filEva, setFilEva] = useState("");
  const [totalStudents, setTotalStudents] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/student-report/total')
      .then((res) => {
        //Đoạn này để lọc danh sách các teacherName bị trùng thì chỉ hiển thị trên dropdown 1 lần
        setDisplayedStudents(res.data.ResponseResult.Result);
        setTotalStudents(res.data.ResponseResult.Result)
        console.log('Data Result');
        console.log(res.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/students/")
      .then((res) => {
        //Đoạn này để lọc danh sách các teacherName bị trùng thì chỉ hiển thị trên dropdown 1 lần
        const allClasses = res.data.ResponseResult.Result;
        const uniqueClasses = allClasses.filter((c, index, self) =>
          index === self.findIndex((t) => t.NameClass === c.NameClass)
        );
        setClasses(uniqueClasses);
        setDisplayedStudents(std);
        console.log('Data Result: ',classes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    search(value.toUpperCase());
    // find(value, ['StudentName', 'StudentID']); 
  };

  const search = (value) => {
    let tempArr = [...totalStudents].map((x) => x)
    let temp = tempArr.filter((item) => {
      return (item?.Student.Name.toUpperCase()).includes(value) || (item?.Student.StudentID.toUpperCase()).includes(value)
    })
    setDisplayedStudents(temp)
  }
  
  // const find = (query) => {
  //   const params = new URLSearchParams();
  //   params.append('query', query);
  //   const url = `http://localhost:3001/api/v1/student-report/total/find?${params}`;
  //   console.log("URL API search: ",url);
  //   axios.get(`http://localhost:3001/api/v1/student-report/total/find?${params}`)
  //     .then((response) => {
  //       setDisplayedStudents(response.data.ResponseResult.Result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <Form className="mb-3" style={{ fontSize: 14 }}>
        <Row>
          <div style={{display:"flex", flexDirection:"row", gap:"16px"}}>
          <Form.Group as={Col} xs="auto">
            <Form.Select name="class" style={{ fontSize: "14px", borderColor: active ? "black" : "none"}}
            onChange={onChange}>
              <option value="TC00" hidden>Class</option>
                  {classes.map((clss) => (
                    <option key={clss.id} value={clss.ClassID}>
                      {clss.NameClass}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs="auto">
            <Form.Select name="type" style={{ fontSize: "14px", borderColor: active_2 ? "black" : "none"}}
            onChange={onChange_2}>
              <option hidden value="None">Evaluation</option>
              <option value="Good">Good</option>
              <option value="Medium">Medium</option>
              <option value="Not-good">Not-good</option>
              <option value="Non">Non</option>
            </Form.Select>
          </Form.Group>
          <div className={`${styled["searchStyle"]}`}>
              <img src={searchSVG}></img>
              <input type="text" placeholder="Search Students..." className={`${styled["focusNone"]}`}
              value={searchValue} 
              onChange={handleSearchChange}></input>
          </div>
          </div>
        </Row>
      </Form>
      {isLoading && <Loading isLoading={isLoading}/>}
      {displayedStudents.length > 0 && !isLoading &&(

      <div className={`${styled["form"]}`}>
        <Table
          bordered
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
            <tr
              className="text-uppercase text-secondary"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <th>Name</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Attendant</th>
              <th>Periodic Tests</th>
              <th>Homework</th>
              <th>Evaluation</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white", cursor: "pointer" }}>
            {displayedStudents.map((_std) => (
              <tr key={_std.id}>
                <td onClick={()=>{navigate(_std.Student._id)}}>
                  <Container>
                    <Row>
                      <Col md="auto">
                        <Image
                          src={_std.Student.ImageURL}
                          roundedCircle="true"
                          style={{objectFit: 'fixed', width: '40px', height: '40px'}}
                        ></Image>
                      </Col>
                      <Col>
                        <b>{_std.Student.Name}</b>
                        <br />
                        <label style={{ color: "#6B7280" }}>{_std.Student.StudentID}</label>
                      </Col>
                    </Row>
                  </Container>
                </td>

                <td style={{ width: "100px", backgroundColor: "white" }}>
                  {_std.Student.NameClass}
                </td>
                <td>{_std.Student.PhoneNumber}</td>
                <td>
                  { _std.TotalResult.TotalReport !== 0 ? mathRound((parseFloat((_std.TotalResult.TotalAttented / _std.TotalResult.TotalReport)) * 100)).toString() : "0"}%<br />
                  <label style={{ color: "#6B7280" }}>Present: {_std.TotalResult.TotalAttented}/{_std.TotalResult.TotalReport}</label>
                </td>
                <td>
                  { _std.TotalResult.TotalTestScoreRequired !== 0 ? mathRound((parseFloat((_std.TotalResult.TotalTestScore / _std.TotalResult.TotalTestScoreRequired)) * 100)).toString() : "0"}%<br />
                  <label style={{ color: "#6B7280" }}>Score: {_std.TotalResult.TotalTestScore}/{_std.TotalResult.TotalTestScoreRequired}</label>
                </td>
                <td>
                { _std.TotalResult.TotalHomeworkScoreRequired !== 0 ? mathRound((parseFloat((_std.TotalResult.TotalHomeworkScore / _std.TotalResult.TotalHomeworkScoreRequired)) * 100)).toString() : "0"}%<br />
                  <label style={{ color: "#6B7280" }}>Score: {_std.TotalResult.TotalHomeworkScore}/{_std.TotalResult.TotalHomeworkScoreRequired}</label>
                </td>
                <td>
                  <h6>
                    {_std.TotalResult.Evaluation === "Good" &&
                      <Badge pill bg="success">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    }
                    {_std.TotalResult.Evaluation === "Medium" &&
                      <Badge pill bg="warning">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    }
                    {_std.TotalResult.Evaluation === "Not-Good" &&
                      <Badge pill bg="danger">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    }
                    {_std.TotalResult.Evaluation === "Non" &&
                      <Badge pill bg="secondary">
                        {_std.TotalResult.Evaluation}
                      </Badge>
                    }
                  </h6>
                </td>
                <td>
                  <button><img src={editSVG} alt="edit"/></button>
                  <br></br>
                  <button><img src={deleteSVG} alt="delete" onClick={(e) => handleDelete(_std.Student._id)} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showConfirmation} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
        <Modal.Title style={{textAlign:'center', alignItems:'center'}}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center', alignItems:'center', fontSize:'20px'}}>
           Are you sure you want to delete this student?
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <button
            onClick={handleCancelDelete}
            style={{ marginRight: '10px', borderRadius:'3px', padding:'7px', backgroundColor:'#3333' }}>
            Cancel
        </button>
        <button 
          style={{ marginRight: '-3px', borderRadius:'3px', color:'black', padding:'7px', backgroundColor:'#EA2027' }}
          onClick={handleConfirmDelete}>
          Delete
        </button>
        </Modal.Footer>
      </Modal>
      </div>
      )}
    </>
  );
}

export default StudentsTable;