import React, { useState, useRef } from "react";
import Stack from 'react-bootstrap/Stack';
import styled from "../components/styleStd.module.css"
import AppLineChart from "../components/LineChart"
import { Badge, Button, Dropdown, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import StudentService from '../../../service.js';
import Flatpickr from "react-flatpickr";
import identification from "../../../assets/images/global/identification.svg"
import printIcon from "../../../assets/images/global/PrintBtn.svg"
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import abc from '../../../assets/images/global/logocard.png';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

const filterTypeOption = {
    daily: "Daily",
    monthly: "Monthly",
    total: "Total"
}

function ClassesAdd() {
    //PRINT PDF
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // STUDIED DATE
    const [datesList, setDatesList] = useState([])
    const [monthsList, setMonthsList] = useState([])
    const [stdInfo, setStdInfo] = useState({});
    const [filterType, setFilterType] = useState(filterTypeOption.monthly);
    const [reportInfo, setReportInfo] = useState({});
    const [chartData, setChartData] = useState([]);
    const [chartMean, setChartMean] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [visibleDate, setVisibilityDate] = useState(true);
    const [visibleMonth, setVisibilityMonth] = useState(false);
    // FILTER OPTION
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth()) + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { studentId } = useParams();
    let sgtHomework = "";
    // GET INITIAL DATA 
    useEffect(() => {
        retrieveStudentDetails(studentId);

        // Get Current Month
        let today = new Date()
        let month = today.getMonth() + 1
        let year = today.getFullYear()
        retrieveStudentReport({studentId, month, year})

        // Get studied Date
        getStudiedDate(studentId)

        setLoading(false)
    }, []);
    
    const retrieveStudentDetails = (id) => {
        StudentService.get(id)
        .then(response => {
            setStdInfo(response.data.ResponseResult.Result);
        })
        .catch(e => {
            console.log('Error: ',e);
        });
    }
    const getStudiedDate = (id) => {
        StudentService.getStudiedDate(id)
        .then(response => {
            setDatesList(response.data.ResponseResult.Result.Date)
            setMonthsList(response.data.ResponseResult.Result.Month)
        })
        .catch(e => {
            console.log('Error: ',e);
        });
    }

    let navigate = useNavigate();

    // STUDENT REPORT INFO
    useEffect(() => {
        if(filterType === filterTypeOption.daily){
            retrieveStudentReport({studentId, date:selectedDate})
        }else if(filterType === filterTypeOption.monthly){
            retrieveStudentReport({studentId, month: selectedMonth, year: selectedYear})
        }else if(filterType === filterTypeOption.total){
            retrieveStudentReportTotal()
        }

    }, [filterType, selectedDate, selectedMonth]);

    useEffect(() => {
        let data = []
        try{
            console.log('reportInfo')
            console.log(reportInfo)
            if(filterType === filterTypeOption.daily || filterType === filterTypeOption.monthly ){
                reportInfo.Reports?.map(report => {
                    let rep = {
                        name: report.Date.slice(0, 10),
                        score: getTotalPercent(0, 0, report.HomeworkScore, report.HomeworkScoreRequired, report.TestScore, report.TestScoreRequired)
                    }
                    data.push(rep)
                })
                if(filterType === filterTypeOption.daily)
                    setChartMean({name: selectedDate})
            }
            else if(filterType === filterTypeOption.total){
                reportInfo.Reports?.map(report => {
                    let rep = {
                        name: report._id.Month.toString() + "/" + report._id.Year.toString(),
                        score:  getTotalPercent(0, 0, report.HomeworkScore, report.HomeworkScoreRequired, report.TestScore, report.TestScoreRequired)
                    }
                    data.push(rep)
                })
                
            }
            
            setChartData(data)
        }catch(e){
            console.log("Error: ", e)
        }
    }, [reportInfo]);

    const retrieveStudentReport = ({studentId, month, year, date} = {}) => {
        StudentService.getStudentReportDailyMonthly({studentId, month, year, date})
        .then(response => {
            setReportInfo(response.data.ResponseResult.Result);
        })
        .catch(e => {
            console.log('Error: ',e);
        });
    };

    const getHwSgt = () => {
        let score = reportInfo.Result?.TotalHomeworkScore/ reportInfo.Result?.TotalHomeworkScoreRequired;
        if (score>=0.9) sgtHomework = "Well done! You can do additional exercises to maintain this form."
        else if (score>=0.8) sgtHomework = "You need to practice more advanced exercises at home to achieve excellent results!"
            else if (score>=0.75) sgtHomework = "You need to do the exercise more carefully and pay attention to correcting the wrong sentences."
                else if (score>=0.5) sgtHomework = "You do your homework poorly and without care. need more attention!"
                    else if (score>=0.5) sgtHomework = "This lack of regular homework will result in very bad results. need more attention!"
        return sgtHomework;
    };

    const retrieveStudentReportTotal = () => {
        StudentService.getStudentReportTotal(studentId)
        .then(response => {
            setReportInfo(response.data.ResponseResult.Result);
        })
        .catch(e => {
            console.log('Error: ',e);
        });
    }
    const retrieveFilterType = (type) => {
        setFilterType(type)
    }
    const retrieveSelectedDate = (date) => {
        setSelectedDate(date)
    }

    // Filter Type
    const [selectValue, setSelectValue] = React.useState("Date");
    const onChange = (event) => {
      const value = event.target.value;
      setSelectValue(value);
      if (value==="Date"){
        setVisibilityDate(true); setVisibilityMonth(false);
      } else 
        if (value==="Month"){
            setVisibilityDate(false); setVisibilityMonth(true);
        } else 
            { 
                setVisibilityDate(false); 
                setVisibilityMonth(false); 
                retrieveFilterType(filterTypeOption.total)
            }
    };


    if(!isLoading)
    return(
        <div className="mx-3" style={{fontSize: "14px"}}>
            <Stack direction="horizontal" gap={2} className="mt-3">
                <Link key="Home" to="/" className="me-3" style={{textDecoration: "none", color: "#1B64F2", fontSize: "14px" }}>Home</Link>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="me-3"
                    style={{ fontSize: "10px", color: "#888" }}></FontAwesomeIcon>
                <Link key="Home" to="/students" className="me-3" style={{textDecoration: "none", color: "#1B64F2", fontSize: "14px" }}>Student List</Link>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="me-3"
                    style={{ fontSize: "10px", color: "#888" }}></FontAwesomeIcon>
                <Link key="Home" to="" className="me-3" style={{textDecoration: "none", color: "#1B64F2", fontSize: "14px" }}>Student Details</Link>
            </Stack>
            <button onClick={handleShow}>
                <div className={`${styled['StdBtn']}`}>
                    <img src={identification} alt="card"/>
                    <div className={`${styled['BtnTe']}`} style={{color:"white"}}>Student Card</div>
                </div>
            </button>
            {/* Filter Type */}
            <div className={`${styled['filterTime']}`}> 
                <select onChange={onChange} className={`${styled['dropDown']}`}>
                    <option defaultValue value="Date">Date</option>
                    <option value="Month">Month</option>
                    <option value="Period">Period</option>
                </select>

                {visibleDate && (
                    <Flatpickr
                    style={{ width: "90px" }}
                    value={selectedDate}
                    options={{
                        enable: datesList,
                        maxDate: datesList[datesList.length - 1],
                        minDate: datesList[0],
                        mode: "single",
                    }}
                    onChange={retrieveSelectedDate}
                    />
                )}

                {visibleMonth &&
                <select name="Month" lassName={`${styled['filedDateMonth']}`} onChange={(e) => {
                    let selectedTimeArr = e.currentTarget.value.split('/')
                    setSelectedMonth(selectedTimeArr[0])
                    setSelectedYear(selectedTimeArr[1])
                    retrieveFilterType(filterTypeOption.monthly)
                    }} 
                >
                    {monthsList.map((month) => <option value={month}>{month}</option>)}
                </select>
                }
            </div>
            {/* Filter Type */}

            <h3 className="mb-3"><b>{stdInfo.Name}</b></h3>
            {/* //body */}
            <div className={styled['container']}>
                {/* above */}
                <div className={`${styled['container_above']}`}>
                    <div className={`${styled['details1']}`}>
                        <p style={{fontSize: "20px", fontWeight: 600}}>Information</p>
                        <div className={`${styled['avt_details']}`}>
                            <Image src={stdInfo.ImageURL} roundedCircle="true" style={{width: "64px", height:"64px", objectFit: "fixed"}}></Image>
                            <div className={`${styled['name_details']}`}>
                                <label style={{fontSize: "16px", fontWeight: "600"}}>{stdInfo.Name}</label>
                                <label style={{color: "#6B7280"}}>ID: {stdInfo.StudentID}</label>
                            </div>
                        </div>
                        <div className={`${styled['alot_details']}`}>
                            <div className={`${styled['icon_label']}`}>
                                <FontAwesomeIcon icon="fa-solid fa-calendar" style={{color: "#6B7280"}} />
                                <label style={{color: "#6B7280"}}>{moment(stdInfo.DateOfBirthday).format("MMMM Do, YYYY")}</label>
                            </div>
                            <div className={`${styled['icon_label']}`}>
                                <FontAwesomeIcon icon="fa-solid fa-phone" style={{color: "#6B7280"}} />
                                <label style={{color: "#6B7280"}}>{stdInfo.PhoneNumber}</label>
                            </div>
                            <div className={`${styled['icon_label']}`}>
                                <FontAwesomeIcon icon="fa-solid fa-envelope" style={{color: "#6B7280"}} />
                                <label style={{color: "#6B7280"}}>{stdInfo.Email}</label>
                            </div>
                            <div className={`${styled['icon_label']}`}>
                                <FontAwesomeIcon icon="fa-solid fa-book-open" style={{color: "#6B7280"}} />
                                <label style={{color: "#6B7280"}}>{stdInfo.NameClass}</label>
                            </div>
                            <div className={`${styled['score']}`}>
                                <div className={`${styled['incom']}`}>
                                    <label style={{color: "#6B7280"}}>Income</label>
                                    <label style={{color: "#6B7280", fontSize: "24px"}}>{stdInfo.ScoreIncome}</label>
                                </div>

                                <div>
                                    <div className={`${styled['divider']}`}></div>
                                </div>

                                <div className={`${styled['desire']}`}>
                                    <label style={{color: "#6B7280"}}>Desire</label>
                                    <label style={{color: "#6B7280", fontSize: "24px"}}>{stdInfo.ScoreDesire}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styled['details2']}`}>
                        <p style={{fontSize: "20px", fontWeight: 600}}>Study Process</p>
                        <div className={`${styled['score_details']}`}>
                            <div className={`${styled['item1']}`}>
                                <div className={`${styled['detailss']}`}>
                                    <label style={{fontSize: "12px", color: "#6B7280"}}>Attendance</label>
                                    <div>
                                        <label style={{fontSize: "16px", fontWeight:400}}>Present:</label>
                                        <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                            {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                            <>{reportInfo.Result?.TotalAttented}/{reportInfo.Result?.TotalReport} lessons </>
                                            }
                                            {(filterType === filterTypeOption.daily) &&
                                                <>{
                                                reportInfo.Result?.Attendance === true ? "Attended" : (
                                                    reportInfo.Result?.Attendance === false ? "Absent" : " - " 
                                                )
                                                }
                                                </>
                                            }
                                            
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                        {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                            <>{ getPercent(reportInfo.Result?.TotalAttented, reportInfo.Result?.TotalReport)}% </>
                                        }
                                        {(filterType === filterTypeOption.daily) &&
                                           <></>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className={`${styled['border_item']}`}></div>

                            <div className={`${styled['item1']}`}>
                                <div className={`${styled['detailss']}`}>
                                    <label style={{fontSize: "12px", color: "#6B7280"}}>Periodic tests</label>
                                    <div>
                                        <label style={{fontSize: "16px", fontWeight:400}}>Score:</label>
                                        <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                            
                                            {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                            <>{reportInfo.Result?.TotalTestScore}/{reportInfo?.Result?.TotalTestScoreRequired} points </>
                                            }
                                            {(filterType === filterTypeOption.daily) &&
                                            <>{reportInfo.Result?.TestScore !== -1 ? reportInfo.Result?.TestScore : 0} points</>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                        {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                            <>{ getPercent(reportInfo.Result?.TotalTestScore, reportInfo.Result?.TotalTestScoreRequired)}%</>
                                        }
                                        {(filterType === filterTypeOption.daily) &&
                                            <>{ getPercent(reportInfo.Result?.TestScore, 100)}%</>
                                        }
                                    </label>
                                </div>
                            </div>
                            
                            <div className={`${styled['border_item']}`}></div>

                            <div className={`${styled['item1']}`}>
                                <div className={`${styled['detailss']}`}>
                                    <label style={{fontSize: "12px", color: "#6B7280"}}>Homework</label>
                                    <div>
                                        <label style={{fontSize: "16px", fontWeight:400}}>Score:</label>
                                        <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                            
                                            {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                                <>{reportInfo.Result?.TotalHomeworkScore}/{reportInfo.Result?.TotalHomeworkScoreRequired} points </>
                                            }
                                            {(filterType === filterTypeOption.daily) &&
                                                <>{reportInfo.Result?.HomeworkScore !== -1 ? reportInfo.Result?.HomeworkScore : 0} points</>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label style={{fontSize: "16px", fontWeight:600, marginLeft: "4px"}}>
                                        {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                            <>{ getPercent(reportInfo.Result?.TotalHomeworkScore, reportInfo.Result?.TotalHomeworkScoreRequired)}%</>
                                        }
                                        {(filterType === filterTypeOption.daily) &&
                                            <>{ getPercent(reportInfo.Result?.HomeworkScore, 100)}%</>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className={`${styled['final_item']}`}>
                                <label style={{width: "223px", fontSize: "16px", fontWeight:400}}>Overall:</label>
                                <label style={{color: "#238723", textAlign: "right", fontSize: "24px", fontWeight: "600"}}>
                                    {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                        <>{getTotalPercent(reportInfo.Result?.TotalHomeworkScore, reportInfo.Result?.TotalHomeworkScoreRequired, reportInfo.Result?.TotalTestScore, reportInfo.Result?.TotalTestScoreRequired, reportInfo.Result?.TotalAttented, reportInfo.Result?.TotalReport).toString()}%</>
                                    }
                                    {(filterType === filterTypeOption.daily) &&
                                        <>{ getTotalPercent(0, 0, reportInfo.Result?.HomeworkScore, reportInfo.Result?.HomeworkScoreRequired , reportInfo.Result?.TestScore, reportInfo.Result?.TestScoreRequired)}%</>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={`${styled['details3']}`}>
                        <p style={{fontSize: "20px", fontWeight: 600}}>Evaluation & Suggestion</p>
                        <div className={`${styled['evaluation']}`}>
                            <label style={{width: "350px", fontSize: "16px", fontWeight:400}}>Evaluation:</label>
                            <h6>
                                {reportInfo.Result?.Evaluation === "Good" &&
                                <Badge pill bg="success">
                                    {reportInfo.Result?.Evaluation}
                                </Badge>
                                }
                                {reportInfo.Result?.Evaluation === "Medium" &&
                                <Badge pill bg="warning">
                                    {reportInfo.Result?.Evaluation}
                                </Badge>
                                }
                                {reportInfo.Result?.Evaluation === "Not-Good" &&
                                <Badge pill bg="danger">
                                    {reportInfo.Result?.Evaluation}
                                </Badge>
                                }
                                {reportInfo.Result?.Evaluation === "Non" &&
                                <Badge pill bg="secondary">
                                    {reportInfo.Result?.Evaluation}
                                </Badge>
                                }
                            </h6>
                        </div>
                        <div className={`${styled['border_bottom']}`}></div>
                        <label style={{width: "350px", fontSize: "16px", fontWeight:400}}>Suggestion:</label>
                        <div>
                            <ul style={{color: "#6B7280", lineHeight: "168%", listStyleType: "circle"}}>
                                <li>
                                {(filterType === filterTypeOption.monthly || filterType === filterTypeOption.total) &&
                                        <>{(reportInfo.Result?.TotalAttented/reportInfo.Result?.TotalReport>=0.85)?("Try to maintain the same level of attendance as before. This is very good!")
                                        :((reportInfo.Result?.TotalAttented/reportInfo.Result?.TotalReport>=0.65)?("Remember to review the lectures in the absences and ask teacher if don't understand them ")
                                        :("Should register for extra classes because of missing a lot of classes!"))}</>
                                        }

                                </li>
                                <li>
                                {(reportInfo.Result?.TotalTestScore/reportInfo?.Result?.TotalTestScoreRequired>=0.9)?("Periodic tests have done very well. Should keep it like that!")
                                    :((reportInfo.Result?.TotalTestScore/reportInfo?.Result?.TotalTestScoreRequired>=0.75)?("Should try to do it faster to have time to do the difficult questions in the lesson.")
                                    :((reportInfo.Result?.TotalTestScore/reportInfo?.Result?.TotalTestScoreRequired>=0.6)?("Need to review the lesson more carefully before the periodic test.")
                                    :("Achieving low results will make it difficult to achieve the goal. Need more focus!")))
                                    }
                                </li>
                                <li>
                                    {(reportInfo.Result?.TotalHomeworkScore/reportInfo.Result?.TotalHomeworkScoreRequired>=0.9)?("Well done! Try to do additional exercises to maintain this form.")
                                    :((reportInfo.Result?.TotalHomeworkScore/reportInfo.Result?.TotalHomeworkScoreRequired>=0.8)?("Need to practice more advanced exercises at home to achieve excellent results!")
                                    :((reportInfo.Result?.TotalHomeworkScore/reportInfo.Result?.TotalHomeworkScoreRequired>=0.75)?("Have to do the exercise more carefully and pay attention to correcting the wrong sentences.")
                                    :((reportInfo.Result?.TotalHomeworkScore/reportInfo.Result?.TotalHomeworkScoreRequired>=0.5)?("Have done homework poorly and without care! Need more attention!"):("Failure to do homework frequently will lead to bad results. Need more attention!"))))
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* below */}
                <div className={`${styled['container_below']}`}>
                    <p style={{fontSize: "20px", fontWeight: 600}}>Overall Score</p>
                    <AppLineChart style={{fontSize: "14px"}} data={chartData} mean={chartMean}/>
                </div>
            </div>

            {/* Student Card */}
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
                <div style={{display:"flex", flexDirection:"row", gap: "12px", alignItems:"center",
            justifyContent:"center"}}>
                    <h3 style={{fontSize:"20px", textAlign:"center", padding:"12px", paddingRight:"0px", paddingBottom:"4px"}}>Student Card</h3>
                    <button onClick={handlePrint}><img src={printIcon} width={"24px"}></img></button>
                </div>
                <div ref={componentRef} className={`${styled['Chan']}`}>
                    <div className={`${styled['Header']}`}>
                        <img src={abc} style={{width:"30px"}}></img>
                        <div className={`${styled['NameScl']}`}>
                            <div className={`${styled['NaSc']}`}>EARTH ENGLISH CENTER</div>
                            <div className={`${styled['NaSc']}`}>TRUNG TÂM ANH NGỮ EARTH</div>
                        </div>
                    </div>

                    <div className={`${styled['Inf']}`}>
                        <div className={`${styled['Inff']}`}>
                            <div className={`${styled['ww']}`}>
                                STUDENT CARD
                            </div>
                        </div>
                        <div className={`${styled['wow']}`} >
                            <img className={`${styled['iimg']}`} src={stdInfo.ImageURL}></img>
                            <div className={`${styled['iiimg']}`}>
                                <div className={`${styled['dataa']}`}>
                                    {stdInfo.Name}
                                </div>
                                <div className={`${styled['dataaa']}`}>
                                    ID: {stdInfo.StudentID}
                                </div>
                                <div className={`${styled['dataaa']}`}>
                                    DOB: {moment(stdInfo.DateOfBirthday).format("MM/DD/YYYY")}
                                </div>
                                <div className={`${styled['dataaa']}`}>
                                    Class: {stdInfo.NameClass}
                                </div>
                            </div>
                        </div>
                        <div className={`${styled['barcode']}`}>
                            <Barcode value={stdInfo.StudentID} margin={0} lineColor="#111827" width={3} 
                            displayValue={0}></Barcode>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}


function mathRound(number){
    return Math.round((number) * 100)/100
}

function getPercent(number, maxNumber){
    let percent = parseFloat((number / maxNumber)) * 100
    return (!percent || percent <0)  ?  "0" :  mathRound((parseFloat((number / maxNumber)) * 100)).toString()
}

function getPercentNumber(number, maxNumber){
    let percent = parseFloat((number / maxNumber)) * 100
    return (!percent || percent <0)  ?  0 :  mathRound((parseFloat((number / maxNumber)) * 100))
}

function getTotalPercent(n1, m1, n2, m2, n3, m3){
    n1 = (n1 < 0 || !n1) ? 0 : n1
    n2 = (n2 < 0 || !n2) ? 0 : n2
    n3 = (n3 < 0 || !n3) ? 0 : n3
    let total = 0, count = 0
    if(getPercentNumber(n1, m1) > 0){
        total += getPercentNumber(n1, m1)
        count ++
    }
    if(getPercentNumber(n2, m2) > 0){
        total +=  getPercentNumber(n2, m2)
        count ++
    }
    if(getPercentNumber(n3, m3) > 0){
        total +=  getPercentNumber(n3, m3)
        count ++
    }
    return (count > 0 ? mathRound(total/count) : 0)
}

export default ClassesAdd