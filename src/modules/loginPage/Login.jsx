import { Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import  Logo  from '../../assets/images/global/LogoLogin.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from './AuthContext';
function LoginPage() {
    const { login } = useAuthContext();
    const [teacherList, setTeacherList] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('http://localhost:3001/api/v1/teacher');
        console.log("Teacher: ",result.data.ResponseResult.Result);
        setTeacherList(result.data.ResponseResult.Result);
      };
      fetchData();
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (email==="admin" && password==="admin"){
        login('admin');
        navigate('/app');
      } 
      else {
        const teacher = teacherList.find((tea) => tea.TeacherID === email && tea.Password === password);
        if (teacher) {
          console.log(teacher);
          localStorage.setItem('teacherID', teacher._id); 
          login(teacher.Name); 
          navigate('/app');
        } 
        else {
          alert("The Username or Password is incorrect. Please try again!");
        }
      }
    }
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{marginTop: "60px"}}>
    <img src={Logo} alt="Logo image" fluid style={{marginTop: "40px", marginBottom: "20px"}}/>
    <h2>Sign in to your account</h2>
    <p className='mb-5'>Or <Link style={{textDecoration:"none"}} to="">contact admin to create new account</Link></p> 
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail" style={{ width: '400px'}}>
        <Form.Control 
          type="text" 
          placeholder="Username"
          value={email}
          style={{borderRadius: "6px", marginBottom:'10px'}}
          onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control 
          type="password" 
          placeholder="Password"
          style={{borderRadius: "6px"}}
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
        {['checkbox'].map((type) => (
          <div key={`default ${type}`} className="mt-3">
            <Row>
              <Col>
                <Form.Check 
                type={type}
                id={`default`}
                label={`Remember me`}
                />
              </Col>
              <Col className="d-flex justify-content-end">
                <a style={{textDecoration:"none", cursor:'pointer', color:'#2877fd'}} onClick={()=>{navigate(`/forgotpassword`);}}>Forgot your password?</a>
              </Col>
            </Row>
            
          </div>
        ))}
      
      <button type="submit" style={{backgroundColor:'#2877fd', width:'100%', marginTop:'7px', padding:'10px 10px', color:'white', fontWeight:'bold', borderRadius:"8px"}}>
        Sign in
      </button>
    </Form>
  </Container>
  );
  }
export default LoginPage;
