import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AppCard from "./Card";
import ClassCard from "./ClassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'

function ClassList({classes}) {
 
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

  let index = 0;
  return (
    <AppCard className="my-3 p-2">
      <Container>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <p style={{fontWeight:700, fontSize:"20px"}}>Class list</p>
          <FontAwesomeIcon icon={faPlusCircle} style={{marginTop:"-16px"}}/>
        </div>
        <Row>
          {classes.map((classInfo) => {
            if (index > colorsBg.length) index = 0;
            const bgColor = colorsBg[index++];
            return (
              <Col md={3}>
                <ClassCard classInfo={classInfo} bgColor={bgColor} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </AppCard>
  );
}

export default ClassList;
