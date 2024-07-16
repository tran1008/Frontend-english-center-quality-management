import React, { useState } from 'react'
import SettingIcon from './SidebarIcon/SettingIcon'
import GlobeIcon from './SidebarIcon/GlobeIcon'
import AdjustmentIcon from './SidebarIcon/AdjustmentIcon'

export default function SidebarFooter() {
    const [adjustmentColor, setAdjustmentColor] = useState("#ffffff");
    const [globeColor, setGlobeColor] = useState("#ffffff");
    const [settingColor, setSettingColor] = useState("#ffffff");
  return (
    <div className='d-flex justify-content-center ' style={{marginBottom: "70px"}}>
        <div  style={{width: "50px", height: "50px"}}
         onMouseEnter={ () => {
            setAdjustmentColor("#1C64F2")
         }}
         onMouseLeave={ () => {
            setAdjustmentColor("#ffffff")
         }}
        >
                <a className='text-center'  href="#" style={{display: "inline-block", width: "50px" ,height: "50px", lineHeight: "50px", marginLeft: "auto", marginRight: "auto"}}>
                        <AdjustmentIcon id="adjustment-icon" color={adjustmentColor}/>
                </a>
            </div>
        <div  style={{width: "50px", height: "50px"}}
            onMouseEnter={ () => {
                setGlobeColor("#1C64F2")
            }}
            onMouseLeave={ () => {
                setGlobeColor("#ffffff")
            }}>
                <a className='text-center' href="#" style={{display: "inline-block", width: "50px" , height: "50px", lineHeight: "50px"}}>
                   
                       <GlobeIcon id="globe-icon" color={globeColor}/>
                </a>
            </div>
        <div  style={{width: "50px", height: "50px"}}
            onMouseEnter={ () => {
                setSettingColor("#1C64F2")
            }}
            onMouseLeave={ () => {
                setSettingColor("#ffffff")
            }}>
                <a className='text-center' href="#" style={{display: "inline-block", width: "50px" , height: "50px", lineHeight: "50px"}}>
                
                        <SettingIcon id="setting-icon" color={settingColor}/>
                </a>
            </div>
           
    </div>
  )
}
