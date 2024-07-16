import React, { useState } from 'react'
import { Container, Col, Row,Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'


function ClassDashboardHeader() {
    const [selectedDate, setSelectedDate]= useState(new Date());

    return (
        <Container>
            <Row>
                <div className="d-flex flex-row mb-3">
                    <div>
                        <Link to="" style={{color:"black", textDecoration:"none"}}>Class List</Link> 
                    </div> {'>'}
                    <div>
                        <Link to="" style={{color:"black", textDecoration:"none"}}>Class Detail</Link>
                    </div>{'>'}
                    <div>
                        <Link to="" style={{color:"black", textDecoration:"none"}}>Class Dashboard</Link>
                    </div>
                </div>
            </Row>
            <Row>
                <Col>
                    <h3>TOE700.1</h3>
                </Col>
                <Col lg='auto' className='border border-secondary rounded'>
                    <Button className='bg-black border border-white'>Daily</Button>
                    <Button className='bg-white border border-white'>
                        <DatePicker
                            showIcon
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ClassDashboardHeader