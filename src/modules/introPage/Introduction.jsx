import React from 'react';
import background from '../../assets/images/global/banner.png'
import laptop from '../../assets/images/global/laptop.png'
import slide from '../../assets/images/global/slide.png'
import logo from '../../assets/images/global/logoname.png'
import section from '../../assets/images/global/section.png'
import slidenavi from '../../assets/images/global/slidenavi.png'
import benzen from '../../assets/images/global/benzen.png'
import vus from '../../assets/images/global/vus.png'
import styled from '../introPage/introStyle.module.css'
import photo from '../../assets/images/global/photo.png'
import social from '../../assets/images/global/socialmedia.png'
import send from '../../assets/images/global/sendIcon.png'
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  let navigate = useNavigate();

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{ backgroundImage: `url(${background})`, height: "750px", width: "100%", order: 0, backgroundSize: "100%"}}>
        <div style={{position: "absolute", width: "100%", height: "80px", left: "0px", top: "0px"}}>
          <img src={logo} style={{position: "absolute", width: "100px", left: "100px", top: "10px"}}></img>
          <div style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "0px", gap: "24px",
            position: "absolute", width: "613px", height: "38px", right: "119px", top: "calc(50% - 38px/2 + 0.5px)"
            }}>
            <div className={`${styled['Home']}`}>
              <div className={`${styled['MenuText']}`}>Home</div>
              <div className={`${styled['MenuSelect']}`}></div>
            </div>
            <div className={`${styled['Home']}`}>
              <div className={`${styled['MenuText']}`}>Features</div>
            </div>
            <div className={`${styled['Home']}`}>
              <div className={`${styled['MenuText']}`}>How It Works</div>
            </div>
            <div className={`${styled['Home']}`}>
              <div className={`${styled['MenuText']}`}>Pricing</div>
            </div>
            <div className={`${styled['Home']}`}>
              <div className={`${styled['MenuText']}`}>Blogs</div>
            </div>
            <div className={`${styled['Divider']}`}>
            </div>
            <div className={`${styled['SignUp']}`}>
              Sign Up
            </div>
            <div className={`${styled['Login']}`}>
              {/* LOGIN LINK HERE! */}
              <button style={{color: "#1C64F2"}} onClick={()=>{navigate(`/login`);}}>Login</button>
            </div>
          </div>
        </div>
        <div className={`${styled['BannerText']}`}>
            <div className={`${styled['StyleText']}`}>
            The #1 student quality management software for English center
            </div>
            <div className={`${styled['StyleText2']}`}>
              One integrated platform for student management, rating and giving advice.
            </div>
            <div className={`${styled['LearnMore']}`}>
              Learn more
            </div>
        </div>
      </div>
      <div className={`${styled['Con2']}`} style={{order: 1}}>
        <div className={`${styled['MainText2']}`}>
          Purposefully built for the small scale center
        </div>
        <div className={`${styled['Conn']}`}>
          <img src={laptop} className={`${styled['Laptopp']}`}></img>
        </div>
        <div className={`${styled['Title2']}`}>
            <div className={`${styled['Sub']}`}>Earth is an all-in-one platform that allows teachers to create students,
               keep records, manage daily operations and track studying, 
               all in a user-friendly platform available on any device connected to the web.
            </div>
            <div className={`${styled['Btn']}`}>
              <button className={`${styled['BtnIn']}`}>Start your 14-day free trial</button>
            </div>
        </div>
      </div>
      <div className={`${styled['Con3']}`} style={{paddingTop:"20px"}}>
        <div className={`${styled['Title']}`}>
          Outstanding Feartures
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", paddingTop: "40px"}}>
          <img src={slide} style={{width:"800px", alignItems:"center"}}></img>
        </div>
        <div className={`${styled['RauMaSuaDua']}`}>
          <div className={`${styled['RauMaMix']}`}>
            <div className={`${styled['KhoaiMon']}`} >
              Study Process Dashboard
            </div>
            <div className={`${styled['TraSua']}`}>
            When you start a new class, you can easily add students, 
            the teacher can manage the entire progress of students by taking attendance, 
            recording homework scores and periodic test scores, from which the system will give useful advice. 
            Not only that, you can easily see the progress of your class on the dashboard through the graphs.
            </div>
          </div>
          <img src={slidenavi} style={{width:"160px", paddingTop: "20px"}}></img>
        </div>
      </div>
      <div className={`${styled['Con4']}`}>
        <img src={photo} style={{width: "160px", height: "160px"}}></img>
        <div>
            <div className={`${styled['hihi']}`}>
              For the past 8 years, I have spent a lot of time using paper to 
              record students' grades. Since using Earth software, my teaching 
              is much faster and more professional. I easily manage the learning process 
              of my students and give them timely advice. Many thanks Earth!
            </div>
            <div className={`${styled['hoho']}`}>
              Ms. Hang Nguyen, Earth Center, Ho Chi Minh City, Vietnam
            </div>
        </div>
      </div>
      <div className={`${styled['Con5']}`} style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <div className={`${styled['Oh']}`}>Success Stories</div>
            <div style={{display: "flex", flexDirection: "row", gap: "24px", paddingTop: "40px"}}>
              <div className={`${styled['Card']}`}>
                <div className={`${styled['avaN']}`}>
                  <img src={vus} style={{width: "80px"}}></img>
                  <div className={`${styled['Wow']}`}>VUS: The rate of students achieving desired results increased by 34%</div>
                </div>
                <div className={`${styled['VaySao']}`}>
                  VUS has applied Earth software in teaching for 2 years and has succeeded in 
                  training many students to achieve high results thanks to useful advice from the Earth system.
                </div>
                <div className={`${styled['TheSao']}`}>
                  <button className={`${styled['btnn']}`}>Read VUS's story</button>
                </div>
              </div>

              <div className={`${styled['Card']}`}>
                <div className={`${styled['avaN']}`}>
                  <img src={benzen} style={{width: "80px"}}></img>
                  <div className={`${styled['Wow']}`}>Benzen: Received a lot of positive feedback from students</div>
                </div>
                <div className={`${styled['VaySao']}`}>
                Benzen said the center has saved a lot of time to keep track of the trainees' progress by using Earth 
                software. Thanks to that, they organize a lot of extra-curricular activities.
                </div>
                <div className={`${styled['TheSao']}`}>
                  <button className={`${styled['btnn']}`}>Read Benzen's story</button>
                </div>
              </div>
            </div>
      </div>
      <div className={`${styled['Con6']}`}>
            <div className={`${styled['Text1']}`}>
              We are a small team of passionate technologists, working together to make student 
              quality management of English centers like Earth more effective without making it 
              difficult for teachers. That is our great goal.
            </div>
      </div>
      <div style={{backgroundImage: `url(${section})`}} className={`${styled['Section']}`}>
            <div className={`${styled['ABC']}`}>
            This could be the beginning of a beautiful relationship.
            </div>
            <div style={{width:"1280px", display: "flex", flexDirection: "column", alignContent: "center", 
            justifyItems:"center",alignItems:"center"}}>
            <div className={`${styled['BCD']}`}>
              <button style={{color:"white", cursor:"pointer"}}>Start your 14-day free trial</button>
            </div>
            </div>
      </div>
      <div className={`${styled['Footer']}`}>
            <div style={{display:"flex", flexDirection:"row", gap:"24px"}}>
              <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                <div className={`${styled['aa']}`}>Earth Company</div>
                <div className={`${styled['ab']}`}>earthuit@gmail.com</div>
                <img style={{height:"24px", width:"96px"}} src={social}></img>
                <div className={`${styled['ab']}`}>© 2024 Earth</div>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                <div className={`${styled['aa']}`}>Information</div>
                <div className={`${styled['ab']}`}>Terms</div>
                <div className={`${styled['ab']}`}>Privacy</div>
                <div className={`${styled['ab']}`}>Jobs</div>
              </div>
            </div>
            <div className={`${styled['BuonNgu']}`}>
              <div className={`${styled['Quaa']}`}>Email Newsletter</div>
              <input placeholder='Email Address' className={`${styled['Huh']}`}></input>
              <div className={`${styled['SendBtn']}`}>
                <div className={`${styled['SenTex']}`}>
                  Send
                </div>
                <img src={send} style={{width: "16px", height: "16px"}}></img>
              </div>
            </div>
      </div>
    </div>
  );
};
export default Introduction;
