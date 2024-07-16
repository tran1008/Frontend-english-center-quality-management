import React, { useState } from "react";
import { useAuthContext } from '../../modules/loginPage/AuthContext';

export default function HeaderAccount() {
    const { user } = useAuthContext(); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
  return (
         <div className="dropdown" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
            <button 
                class="btn bg-dark dropdown-toggle text-white" 
                type="button" id="dropdownMenuButton"
                data-mdb-toggle="dropdown" 
                aria-expanded={isDropdownOpen ? "true" : "false"}
                disabled
                style={{maxWidth:"300px", height: "39px", fontWeight: "600", borderRadius: "0.375rem", color: "black"}}>
                <span style={{ marginRight: "2px", fontSize: "14px", fontWeight: 600 }}>
                    {user === 'admin' ? 'Admin' : 'Teacher: ' + user}
                </span>
            </button>

            <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                <li>
                    <a class="dropdown-item" href='#'>Edit</a>
                </li>
                <li>
                    <a class="dropdown-item" href='#'>Info</a>
                </li>
                <li>
                    <a class="dropdown-item" href='/'>Logout</a>
                </li>
            </ul>
        </div>
  )
}
