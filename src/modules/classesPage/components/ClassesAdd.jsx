import React, { useState, useRef, useEffect } from "react";
import { Col, Form, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import styled from "../../studentsPage/components/styleStd.module.css"
import axios from "axios";


function ClassesAdd(){
    const navigate = useNavigate();
    const [classIn, setClassIn] = useState([]);
    const typeRef = useRef("");
    const nameRef = useRef("");
    const termFromRef = useRef("");
    const termToRef = useRef("");
    const scoreRequiredRef = useRef("");
    const scoreTargetRef = useRef("");
    const teacherNameRef = useRef("");
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

  
    const saveHandler = async () => {
        try {
            const classInfo = {
                Type: typeRef.current.value,
                Name: nameRef.current.value,
                TermFrom: termFromRef.current.value,
                TermTo: termToRef.current.value,
                ScoreRequired: scoreRequiredRef.current.value,
                ScoreTarget: scoreTargetRef.current.value,
                TeacherID: selectedTeacher ? selectedTeacher._id : "",
                TeacherName: selectedTeacher ? selectedTeacher.Name : "",
            };
            setClassIn(classInfo)
            console.log('Student Info: ',classInfo);

            const response = await axios.post('http://localhost:3001/api/v1/class', classInfo);
            
            const classID = response.data.ClassID;
            const apiNewClass = { 
                ...classIn,
                ClassID: classID
            };
            console.log("ClassID: ", classID );
            console.log('API new class: ', apiNewClass);
            axios.post('http://localhost:3001/api/v1/class', apiNewClass);
            
            // alert('Tạo mới Class thành công');
            navigate('/app/classes');
        } 
        catch (e) {
            console.log('Lỗi: ', e);
            alert('Đã có lỗi xảy ra khi tạo mới Class');
        }
    };

    useEffect(()=>{
        axios.get('http://localhost:3001/api/v1/teacher/')
        .then(res => setTeachers(res.data.ResponseResult.Result))
        .catch(error => console.log(error));
    },[]);

      
    return(
        <div style={{fontSize: "14px"}}>
            <div className={`${styled['form']}`} style={{height:"344px"}}>
                <Form className={`${styled['inside']}`} style={{height: "307px"}}>
                    <Row>
                        <div className={`${styled['name']}`}>
                            <Form.Group controlId="formName" style={{width: "350px"}}>
                                <Form.Label style={{fontWeight:"500"}}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" style={{fontSize: "14px", marginTop:"-4px"}} ref={nameRef}/>
                            </Form.Group>
                            <Form.Group style={{width: "340px"}} controlId="formTypeID">
                                <Form.Label style={{fontWeight:"500"}}>Type</Form.Label>
                                <Form.Select defaultValue="Type" placeholder="Type" style={{fontSize: "14px", marginTop:"-4px"}} ref={typeRef}>
                                    <option hidden>Select Type Class</option>
                                    <option value="TC01">TOEIC Reading & Listening</option>
                                    <option value="TC02">TOEIC Writing & Speaking</option>
                                    <option value="TC03">IELTS</option>
                                    <option value="TC04">TOEFL</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
          
                    <Row>
                        <span style={{marginBottom:'8px', fontWeight:"500"}}>Term From To</span>
                        <Col>
                            <Form.Group controlId="formTermFrom">
                                <Form.Control type="date" style={{fontSize: "14px", marginTop:"-4px", width:"300px"}} ref={termFromRef}/>
                            </Form.Group>
                        </Col>
                        <Col> 
                             <FontAwesomeIcon icon={faArrowRight} style={{width: "20px", marginLeft:"18px"}}/>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTermTo">
                                <Form.Control type="date" style={{fontSize: "14px", marginTop:"-4px", width:"300px"}} ref={termToRef}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formTeacher" style={{ width: "300px" }}>
                                <Form.Label style={{ fontWeight: "500" }}>Teacher</Form.Label>
                                <Form.Select as="select" style={{ fontSize: "14px", marginTop:"-4px"}}
                                ref={teacherNameRef}
                                onChange={(e) => {
                                    const teacherId = e.target.value;
                                    const selectedTeacherInfo = teachers.find((teacher) => teacher._id === teacherId);
                                    setSelectedTeacher(selectedTeacherInfo);
                                  }}
                                >
                                    <option hidden>Select a Teacher</option>
                                   {teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.Name}
                                    </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGridScoreRequired">
                                <Form.Label style={{fontWeight:"500"}}>Score required</Form.Label>
                                <Form.Control type="number" min="0" placeholder="Score required" style={{fontSize: "14px", marginTop:"-4px"}} ref={scoreRequiredRef}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGridScoreTarget">
                                <Form.Label style={{fontWeight:"500"}}>Score Target</Form.Label>
                                <Form.Control type="number" min="0" placeholder="Score target" style={{fontSize: "14px", marginTop:"-4px"}} ref={scoreTargetRef} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Form>
               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        style={{
                        display:'flex',
                        position:'absolute',
                        padding: '5px',
                        left: '659px',
                        bottom:'50px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        paddingInline: '22px',
                        color: 'white',
                        backgroundColor: 'black',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        }}
                        onClick={saveHandler}
                    >
                        Save
                    </button>
                    </div>
            </div>
        </div>
    );
}

export default ClassesAdd