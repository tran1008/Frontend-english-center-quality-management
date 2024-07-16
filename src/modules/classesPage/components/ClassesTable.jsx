import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Table, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../studentsPage/components/styleStd.module.css"
import deleteSVG from "../../../assets/images/global/delete.svg";
import editSVG from "../../../assets/images/global/edit.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import NoClass from "./NoClass";

function ClassesTable({ classes }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading]= useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'
    ];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day} ${year}`;
  };
  
  // Handle Delete Class
  const [classList, setClassList] = useState([]);
  const [classDeleted, setClassDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  
  //----------- Handle Search Class------------
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  
    find(value, ['TeacherName', 'ClassID']); 
  };
  
  const find = (query) => {
    const params = new URLSearchParams();
    params.append('query', query);
    const url = `http://localhost:3001/api/v1/class/find?${params}`;
    console.log("URL API search: ",url);
    axios.get(`http://localhost:3001/api/v1/class/find?${params}`)
      .then((response) => {
        setDisplayedClasses(response.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/v1/class');
      setClassList(result.data);
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false)
    }, 400);
  }, [classDeleted]);

  //-----------Hanle Delete Class----------
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

  const deleteHandler = async (Id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/class/${Id}`);
      console.log(response.data.message);
      if (Array.isArray(classList)) {
        setClassList(classList.filter((cls) => cls._id !== Id));
      }
      setClassDeleted(prevState => !prevState);
      window.location.reload();
      
    } 
    catch (error) {
      console.log(error);
      alert('Đã có lỗi xảy ra khi xóa class!');
    }
  };

 
  //---------handle filter Teacher and TypeClass---------------
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [displayedClasses, setDisplayedClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/class/")
      .then((res) => {
        const allTeachers = res.data.ResponseResult.Result;
        const uniqueTeachers = allTeachers.filter((teacher, index, self) =>
          index === self.findIndex((t) => t.TeacherName === teacher.TeacherName)
        );

        setTeachers(uniqueTeachers);
        setDisplayedClasses(allTeachers);
        console.log('Data result');
        console.log(res.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ----------Handle filter Teacher----------
  const handleTeacherChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTeacher(selectedValue);
    if (selectedValue === "") {
      setDisplayedClasses(classes);
      return;
    }
    axios
      .get(
        `http://localhost:3001/api/v1/class/?teacherName=${selectedValue}&classType=${selectedType}`
      )
      .then((response) => {
        setDisplayedClasses(response.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //----------Filter Type-------------
  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    if (selectedValue === "") {
      setDisplayedClasses(classes);
      return;
    }
    axios
      .get(
        `http://localhost:3001/api/v1/class/?teacherName=${selectedTeacher}&classType=${selectedValue}`
      )
      .then((response) => {
        setDisplayedClasses(response.data.ResponseResult.Result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleClassClick = (classId) => {
  //   navigate(`/app/classes/${classId}/dashboard`);
  // };

  return (
    <div>
      <Container>
           <Row style={{marginLeft:"-24px"}}>
           <Col xs="auto">
              <Form.Group>
                <Form.Select name="teacher" style={{ fontSize: "14px" }} value={selectedTeacher} onChange={handleTeacherChange}>
                  <option hidden>Select a Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.TeacherName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group>
                <Form.Select name="type" style={{ fontSize: "14px" }} value={selectedType} onChange={handleTypeChange}>
                  <option hidden>Type</option>
                  <option value="TC01">TOEIC Reading & Listening</option>
                  <option value="TC02">TOEIC Writing & Speaking</option>
                  <option value="TC03">IETLS</option>
                  <option value="TC04">TOEFL</option>
                </Form.Select>
              </Form.Group>
            </Col>
           
            <Col xs="auto">
              <Form.Group>
                <Form.Control 
                  type="text"  
                  placeholder="Search Class..." 
                  style={{ fontSize: '14px' }} 
                  value={searchValue} 
                  onChange={handleSearchChange}/>
              </Form.Group>
            </Col>

            <Col className="d-flex justify-content-end">
              <Link to='add' className='bg-primary text-light py-1 px-3 rounded-2 text-decoration-none' style={{alignItems: "center"}}>
              <FontAwesomeIcon icon={faPlusCircle}/>
              <span className='ps-2' style={{fontSize: "14px"}}>Add Class</span>
              </Link>
            </Col>
          </Row>
      </Container>

      {isLoading && <Loading isLoading={isLoading}/>}

      {displayedClasses.length > 0 && !isLoading && (
      <div style={{paddingTop:'20px'}} className={`${styled["form"]}`}>
        <Table bordered
            hover
            style={{
              fontSize: 14,
              borderCollapse: "collapse",
              borderRadius: "1em",
              overflow: "hidden",
              borderColor: "#E5E7EB",
              backgroundColor: "white",
              cursor:'pointer'
            }}>
          <thead>
            <tr className="text-uppercase text-secondary">
              <th>Name</th>
              <th>Teacher</th>
              <th>Num of Student</th>
              <th>From - To</th>
              <th>Type Name</th>
            </tr>
          </thead>
          <tbody>
          {displayedClasses.map((_class) => (
              <tr key={_class._id}>
                <td>
                  <Link to={_class.ClassID + '/dashboard'}
                    className="text-decoration-none text-dark fw-semibold"
                    // onClick={() => handleClassClick(_class.ClassID)}
                  >
                    {_class.ClassID} <br/>
                    <span style={{fontSize:'12px',color:'#555'}}>{_class.Name}</span>
                  </Link>
                </td>
                
                <td> 
                  <Link to={_class.ClassID + '/dashboard'} 
                    className="text-decoration-none text-dark">
                    {_class.TeacherName}
                  </Link>
                </td>
                <td>
                  <Link to={_class.ClassID + '/dashboard'} className="text-decoration-none text-dark">
                    {_class.NumberOfStudent}
                  </Link>
                </td>
                <td>
                <td>
                  <Link to={_class.ClassID + '/dashboard'} className="text-decoration-none text-dark">
                    {`${formatDate(_class.TermFrom)} - ${formatDate(_class.TermTo)}`}
                  </Link>
                </td>
                </td>
                <td>
                <Link to={_class.ClassID + '/dashboard'} className="text-decoration-none text-dark">
                  {(() => {
                    switch (_class.Type) {
                      case "TC01":
                        return "TOEIC Reading & Listening";
                      case "TC02":
                        return "TOEIC Writing & Speaking";
                      case "TC03":
                        return "IELTS";
                      case "TC04":
                        return "TOEFL";
                      default:
                        return _class.Type;
                    }
                  })()}
                  </Link>
                </td>
                <td>
                  <button>
                    <img src={editSVG} alt="edit" />
                  </button>
                  <br></br>
                  <button onClick={() => handleDelete(_class._id)}>
                    <img src={deleteSVG} alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      )}

      {displayedClasses.length === 0 && !isLoading && <NoClass />}

      <Modal show={showConfirmation} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
        <Modal.Title style={{textAlign:'center', alignItems:'center'}}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center', alignItems:'center', fontSize:'20px'}}>
           Are you sure you want to delete this class?
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
  );
}

export default ClassesTable;
