import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row, Form, Stack, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import deleteSVG from "../../../assets/images/global/delete.svg";
import axios from "axios";
import moment from "moment";

import Loading from "../../classesPage/components/Loading.jsx";
import NoTeacher from "../../classesPage/components/NoTeacher.jsx";
import { useAuthContext } from '../../loginPage/AuthContext';

function calculateExperience(startDate) {
  const today = moment();
  const start = moment(startDate);
  const yearsOfExperience = today.diff(start, "years");
  return yearsOfExperience;
}

function TeachersPage() {
  const [isLoading, setIsLoading]= useState(true);
  let navigate = useNavigate();
  const { user } = useAuthContext(); // Accessing the user from the authentication context

  // Gọi API:
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherClassIDs, setTeacherClassIDs] = useState([]);

  // useEffect(() => {
  //   TeacherService.getAll()
  //     .then((res) => {
  //       setTeachers(res.data.ResponseResult.Result);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
// Search teacher
const [searchValue, setSearchValue] = useState("");
  
//Search handle
const handleSearchChange = (event) => {
  const value = event.target.value;
  setSearchValue(value);

  find(value, ['TeacherName', 'ClassID']); 
};

const find = (query) => {
  const params = new URLSearchParams();
  params.append('query', query);
  const url = `http://localhost:3001/api/v1/teacher/find?${params}`;
  console.log("URL API search: ",url);
  axios.get(`http://localhost:3001/api/v1/teacher/find?${params}`)
    .then((response) => {
      setTeachers(response.data.ResponseResult.Result);
    })
    .catch((error) => {
      console.log(error);
    });
};
useEffect(() => {
  find(searchValue);
}, [searchValue]);
  //Bộ lọc:
  const [selectedCertificate, setSelectedCertificate] = useState("");
const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const handleCertificateChange = (event) => {
    setSelectedCertificate(event.target.value);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchTeachers();
  }, [selectedCertificate]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/teacher", {
        params: { Certificate: selectedCertificate }, 
      });

      const teacherList = response.data.ResponseResult.Result;
      setTeachers(teacherList);

      // GetClassByTeacher
      const classPromises = teacherList.map((teacher) =>
      axios.get(`http://localhost:3001/api/v1/class/teacherid/${teacher._id}`)
      );
      const classResponses = await Promise.all(classPromises);
      const classLists = classResponses.map((response) => response.data.ResponseResult.Result);
      setTeacherClasses(classLists);

      const classIDs = classLists.map((classList) =>
      classList.map((classItem) => classItem.ClassID));
      setTeacherClassIDs(classIDs);
        
      setIsLoading(false);
    } 
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/class/td", {
          params: { teacherId: selectedTeacherId },
        });
        const classList = response.data.ResponseResult.Result;
        setClasses(classList);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, [selectedTeacherId]);

  const [teacherList, setTeacherList] = useState([]);
  const [teacherDeleted, setTeacherDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  //delete Teacher
  const handleDelete = (id) => {
    setTeacherToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (teacherToDelete) {
      deleteHandler(teacherToDelete);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setTeacherToDelete(null);
    setShowConfirmation(false);
  };

  const deleteHandler = async (Id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/teacher/${Id}`);
      console.log(response.data.message);
      if (Array.isArray(teacherList)) {
        setTeacherList(teacherList.filter((tcs) => tcs._id !== Id));
      }
      setTeacherDeleted(prevState => !prevState);
      window.location.reload();
    } 
    catch (error) {
      console.log(error);
      alert('Đã có lỗi xảy ra khi xóa teacher!');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/v1/teacher');
      setTeacherList(result.data);
    };
    fetchData();
  }, [teacherDeleted]);


  const fetchClassNames = async (classIds) => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/class", {
        params: { classIds },
      });


      const classList = response.data.ResponseResult.Result;
      return classList.map((classItem) => classItem.name);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const [filTeacher, setFilTeacher] = useState("");
  const [filEva, setFilEva] = useState("");
  const [totalTeachers, setTotalTeachers] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);

  return (
    <>
      {/* Filter */}
      <Container>
        <Row>
          <Col className="mb-4" md={5}>
            <Stack direction="horizontal" gap={2} className="mt-3">
              <Link
                key="Home"
                to="/"
                className="me-3"
                style={{
                  textDecoration: "none",
                  color: "#1B64F2",
                  fontSize: "14px",
                }}
              >
                Home
              </Link>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="me-3"
                style={{ fontSize: "10px", color: "#888" }}
              ></FontAwesomeIcon>
              <Link
                key="Home"
                to=""
                className="me-3"
                style={{
                  textDecoration: "none",
                  color: "#1B64F2",
                  fontSize: "14px",
                }}
              >
                Teacher List
              </Link>
            </Stack>
            <h3 className="mb-3">
              <b>Teacher List</b>
            </h3>
            <Row>
              <Col xs="auto">
                <Form.Group as={Col} xs="auto">
                  <Form.Select
                    name="Certificate"
                    style={{ fontSize: "14px", cursor: "pointer" }}
                    value={selectedCertificate}
                    onChange={handleCertificateChange}
                  >
                    <option hidden>Expertise</option>
                    <option value="TOEIC">TOEIC</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs="auto">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search Teacher..."
                    style={{ fontSize: "14px" }}
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
              </Col>

            </Row>
          </Col>
          {user === "admin" && (
          <Col className="text-end" style={{ marginTop: "32px" }}>
            <Link
              to="/app/newteacher"
              className="bg-primary text-light py-2 px-3 rounded-2 text-decoration-none"
              style={{ alignItems: "center" }}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className="ps-2" style={{ fontSize: "14px" }}>
                Add Teacher
              </span>
            </Link>
          </Col>
          )}
        </Row>

        {isLoading && <Loading isLoading={isLoading}/>}

        {teachers.length > 0 && !isLoading &&(
             <Row 
              style={{ cursor: user !== "admin" ? "not-allowed" : "pointer" }}
              disabled={user!== "admin"}
             >
             <Table
               bordered
               hover
               style={{
                 fontSize: 14,
                 borderCollapse: "collapse",
                 borderRadius: "8px",
                 overflow: "hidden",
                 borderColor: "#E5E7EB",
                 marginLeft: "12px",
               }}
             >
               <thead>
                 <tr
                   className="text-uppercase text-secondary"
                   style={{ backgroundColor: "#F9FAFB" }}
                 >
                   <th>NAME</th>
                   <th>PHONE</th>
                   <th>EMAIL</th>
                   <th>EXPERTISE</th>
                   <th>EXPERIENCE</th>
                   <th>TEACHING CLASS</th>
                   <th></th>
                 </tr>
               </thead>
   
               <tbody>
                 {teachers.map((teacher, index) => (
                   <tr key={teacher.id} >
                      <td 
                      // onClick={()=>{navigate(`/teachers/${teacher._id}`);}}
                      onClick={user === "admin" ? () => navigate(`/app/teachers/${teacher._id}`) : null}
                      style={{ cursor: user!== "admin" ? "not-allowed" : "pointer" }}
                      >
                        <Container>
                          <Row>
                            <Col md="auto">
                            <Image
                              src={teacher.ImageURL}
                              roundedCircle="true"
                              style={{
                                height: "40px",
                                width: "40px",
                                objectFit: "fixed"
                              }}
                            ></Image>
                            </Col>
                            <Col>
                              <b>{teacher.Name}</b>
                              <br />
                              <label style={{ color: "#6B7280" }}>{teacher.TeacherID}</label>
                            </Col>
                          </Row>
                        </Container>
                      </td>

                     <td>{teacher.PhoneNumber}</td>
                     <td>{teacher.Email}</td>
                     <td>
                       {teacher.Certificate}
                     </td>
                     <td>{calculateExperience(teacher.StartedDate)+' Years'}</td>
   
                     <td>
                       {Array.isArray(teacherClassIDs[index]) && teacherClassIDs[index].length > 0 ? (
                       teacherClassIDs[index].map((classID) => (
                         <div key={classID}>{classID}</div>
                       ))
                       ) : (
                         <div>No classes</div>
                       )}
                    </td>
                     {/* {teacher.classIds.join(", ")} */}
                     <td>
                      {/* <button onClick={() => handleDelete(teacher._id)}>
                        <img src={deleteSVG} alt="delete" />
                      </button> */}
                      {user === "admin" && (
                        <button onClick={() => handleDelete(teacher._id)}>
                          <img src={deleteSVG} alt="delete" />
                        </button>
                      )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </Table>
           </Row>
        )}
      {teachers.length === 0 && !isLoading && <NoTeacher />}

      <Modal show={showConfirmation} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
        <Modal.Title style={{textAlign:'center', alignItems:'center'}}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center', alignItems:'center', fontSize:'20px'}}>
           Are you sure you want to delete this Teacher?
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
      </Container>
    </>
  );
}
export default TeachersPage;
