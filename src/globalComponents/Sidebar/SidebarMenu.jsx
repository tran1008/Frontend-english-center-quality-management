import React from 'react'; 
import CertificateIcon from './SidebarIcon/CertificateIcon.jsx'
import ChartPieIcon from './SidebarIcon/ChartPieIcon.jsx'
import ClassIcon from './SidebarIcon/ClassIcon.jsx'
import GlobeIcon from './SidebarIcon/GlobeIcon.jsx'
import HelpIcon from './SidebarIcon/HelpIcon.jsx'
import SettingIcon from './SidebarIcon/SettingIcon.jsx'
import StudentIcon from './SidebarIcon/StudentIcon.jsx'
import TeacherIcon from './SidebarIcon/TeacherIcon.jsx'
const SidebarMenu = {
  id: 1,
  title: "Teller Operation",
  subMenuL1: [
    {
      id: 1,
      title: "Dashboard",
      icon: ChartPieIcon,
      route: "/app/",
    },
    {
      id: 2,
      title: "Students",
      icon: StudentIcon,
      route: "/app/students",
    },
    {
      id: 3,
      title: "Classes",
      icon: ClassIcon,
      route: "/app/classes",
    },
    {
      id: 4,
      title: "Teachers",
      icon: TeacherIcon,
      route: "/app/teachers",
    },
    {
      id: 6,
      title: "Help",
      icon: HelpIcon,
      route: "/help",
    },
  ],
};


export default SidebarMenu