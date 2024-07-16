import React from "react";
import { Outlet } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./globalComponents/Header/Header";
import Sidebar from './globalComponents/Sidebar/Sidebar';


const Root = () => {
  return (
    <Container fluid>
      {/* <Header /> */}
      <Header />
      <Row className='d-flex'>
        {/* <Sidebars /> */}  
        <Col xs={2} style={{borderRight: "1px solid #E5E7EB" }}>
            <Sidebar/>
        </Col>
        <Col xs={10}>
          {/* content of web will appear here */}
            <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
export default Root;
