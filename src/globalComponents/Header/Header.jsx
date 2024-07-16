import React from 'react'
import LogoImg from '../../assets/images/global/earth.png'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderNotification from './HeaderNotification'
import HeaderAccount from './HeaderAccount'
import './Header.css'

export default function Header() {
  return (
    <div className='sticky-top header-disable-copy'>
        <Container fluid
        style={{
            height: "70px", 
            padding: "12px",
            backgroundColor: "white",
            borderBottom: "1px solid #E5E7EB"
            }}>
            <Row>
                <Col className='col-1'>
                   <div>
                        <a href='/app'> 
                            <img src={LogoImg} style={{lineHeight: '32px', height: '32px', padding: '1px', marginLeft:'8px', marginTop:"6px"}}/>
                        </a> 
                   </div>
                </Col>
                <Col className='col-2'>
                  <a href='/app' style={{lineHeight:'46px', textDecoration:'none', fontSize:'20px', color:'black', fontWeight:'bold', cursor:'pointer'}} >Earth Center English</a>
                </Col>
                <Col className='col-3'>
                    <HeaderSearchBar />
                </Col>
                <Col className='col-6 d-flex justify-content-end'>
                    <HeaderNotification/>
                    <HeaderAccount />
                </Col>
            </Row>
        </Container>
    </div>
  )
}
