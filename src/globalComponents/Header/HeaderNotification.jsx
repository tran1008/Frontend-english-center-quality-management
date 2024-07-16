import React from 'react'
import BellSVG from '../../assets/images/global/bell.svg'
import * as mdb from 'mdb-ui-kit'; 

export default function HeaderNotification() {
  return (
    <div >
        <div class="dropdown">
            <a className="me-3 hidden-arrow" href="#" id="navbarDropdownMenuLink"
            role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                <img src={BellSVG} alt="bell"
                    style={{lineHeight: '42px', height: '42px', padding: '12px'}}/>
                {/* <span class="badge rounded-pill badge-notification bg-danger">1</span> */}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <p class="dropdown-item">Some news</p>
                </li>
                <li>
                    <p class="dropdown-item">Some news</p>
                </li>
                <li>
                    <p class="dropdown-item">Some news</p>
                </li>
            </ul>
        </div>
    </div>
  )
}
