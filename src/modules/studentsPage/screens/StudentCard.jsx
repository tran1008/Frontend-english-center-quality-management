import React from "react";
import abc from '../../../assets/images/global/logocard.png';
import Barcode from 'react-barcode';
import styled from "../components/styleStd.module.css"

function StudentCard({ stdInfo, refHere }) {
  return (
    <div ref={refHere} className={`${styled['Chan']}`}>
    <div className={`${styled['The']}`}>
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
                                    DOB: {stdInfo.DateOfBirthday}
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
                </div>
  );
}

export default StudentCard;
