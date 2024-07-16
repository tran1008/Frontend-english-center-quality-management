import React, { useEffect, useState } from 'react';
import ClassesTable from '../components/ClassesTable';
import {ClassService} from "../../../service.js";
import { TeacherService } from "../../../service.js";
import axios from "axios";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import styled from "../../teachersPage/components/styleTc.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassList from "../../teachersPage/components/ClassList";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import Stack from "react-bootstrap/Stack";

function ClassesPage() {
    function calculateExperience(startDate) {
        const today = moment();
        const start = moment(startDate);
        const yearsOfExperience = today.diff(start, "years");
        return yearsOfExperience;
      }

    const [teacher, setTeacher] = useState({});
    const [teacherClasses, setTeacherClasses] = useState([]);
    const [data, setData] = useState([]);
    var user = localStorage.getItem('user');
    var id = localStorage.getItem('teacherID');
    console.log("name: ",user);
    console.log("teacher id: ", id);
    useEffect(() => {
        ClassService.getAll()
        .then((res) => {
            setData(res.data.ResponseResult.Result);
        })
        .catch(err => console.log(err));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthIndex = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        return `${monthNames[monthIndex]} ${day}${","} ${year}`;
      };
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await TeacherService.get(id);
            const teacherData = response.data.ResponseResult.Result;
            setTeacher(teacherData);
      
            const classResponse = await axios.get(
              `http://localhost:3001/api/v1/class/teacherid/${teacherData._id}`
            );
            const classData = classResponse.data.ResponseResult.Result;
            setTeacherClasses(classData);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, [id]);

    return (<div>
        { user=="admin" && <ClassesTable classes={data}/>}
        { user!="admin" && 
            <div className="" style={{fontSize: "14px"}}>
                <Row>
                <Col md={4}>
                    <div className={`${styled["details1"]}`}>
                    <p style={{ fontSize: "20px", fontWeight: 600 }}>Information</p>
                    <div className={`${styled["avt_details"]}`}>
                        <Image
                        src={teacher.ImageURL}
                        roundedCircle="true"
                        width="64px"
                        height="64px"
                        ></Image>
                        <div className={`${styled["name_details"]}`}>
                        <label style={{ fontSize: "16px", fontWeight: "600" }}>
                            {teacher.Name}
                        </label>
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>
                            ID: {teacher.TeacherID}
                        </label>
                        </div>
                    </div>
                    <div className={`${styled["alot_details"]}`}>
                        <div className={`${styled["icon_label"]}`}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-calendar"
                            style={{ color: "#6B7280", height: "14px" }}
                        />
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>

                            {moment(teacher.DateOfBirth).format("MMMM Do, YYYY")}

                            {/* {teacher.DateOfBirth} */}
                            {`${formatDate(teacher.DateOfBirth)}`}

                        </label>
                        </div>
                        <div className={`${styled["icon_label"]}`}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-phone"
                            style={{ color: "#6B7280", height: "14px" }}
                        />
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>
                            {teacher.PhoneNumber}
                        </label>
                        </div>
                        <div className={`${styled["icon_label"]}`}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-envelope"
                            style={{ color: "#6B7280", height: "14px" }}
                        />
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>
                            {teacher.Email}
                        </label>
                        </div>
                        <div className={`${styled["icon_label"]}`}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-graduation-cap"
                            style={{ color: "#6B7280", height: "14px" }}
                        />
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>
                            {teacher.Certificate}
                            {/* {teacher.Score} */}
                        </label>
                        </div>
                        <div className={`${styled["icon_label"]}`}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-star"
                            style={{ color: "#6B7280", height: "14px" }}
                        />
                        <label style={{ color: "#6B7280", fontSize: "14px" }}>
                            {calculateExperience(teacher.StartedDate)} year
                        </label>
                        </div>
                    </div>
                    </div>
                </Col>
                <Col md={8}>
                <ClassList teacherClasses={teacherClasses} />
                </Col>
                </Row>
            </div>
        }
        </div>
    )
}

export default  ClassesPage