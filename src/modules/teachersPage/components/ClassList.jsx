import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AppCard from "./Card";
import ClassCard from "./ClassCard";
import NoClass from "../../classesPage/components/NoClass";
import Loading from "../../classesPage/components/Loading";

function ClassList({teacherClasses }) {
  const [isLoading, setIsLoading]= useState(true);
  const colorsBg = [
    "#1C64F2",
    "#BC2FB6",
    "#9B51E0",
    "#F2C94C",
    "#F2994A",
    "#1BB0A7",
    "#E83480",
    "#27AE60",
    "#2D9CDB",
  ];

  // useEffect(() => {
  //   if (teacherClasses.length > 0) {
  //     setIsLoading(false);
  //   }
  // }, [teacherClasses]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  let index = 0;
  return (
    <AppCard className="">
      <Container>
        <p style={{fontSize: "20px", fontWeight: 600}}>Teaching Classes</p>
       {isLoading && <Loading isLoading={isLoading}/>}
       {teacherClasses.length > 0 && !isLoading &&(
           <Row>
           {teacherClasses.map((classInfo) => {
             if (index > colorsBg.length) index = 0;
             const bgColor = colorsBg[index++];
             return (
               <Col md={4}>
                 <ClassCard classInfo={classInfo} bgColor={bgColor} />
               </Col>
             );
           })}
         </Row>
       )}
      {teacherClasses.length === 0 && !isLoading && <NoClass />}

      </Container>
    </AppCard>
  );
}

export default ClassList;
