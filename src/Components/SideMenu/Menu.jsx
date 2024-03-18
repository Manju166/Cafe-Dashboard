import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
// import { LuUser2 } from "react-icons/lu";
import { VscReport } from "react-icons/vsc";
import './Menu.css'
const Menu=() =>{
    const items =[
        {
          label:"Dashboard",
          icon:<AiFillDashboard />,
          key:"/dashboard"
        },
        {
            label:"Category",
            icon:<BiCategoryAlt />,
            key:"/category"
        },
        {
            label:"Menu List",
            icon:<MdOutlineMenu />,
            key:"/menuItem"
        },
        {
            label:"Order List",
            icon:<FaCartArrowDown />,
            key:"/orders"
        },
        // {
        //     label:"Customers",
        //     icon:<LuUser2 />,
        //     key:"/customers"
        // },
         {  
            label:"Report",
            icon: <VscReport/>,
            key:"/reports"
        },
    ]
    const navigate=useNavigate();
    const handleClick=(key)=>{
      navigate(key);
    }
   
  return (
    <>
    <div className="SideMenu">
    {
     items.map((item,index)=>{
       return(
         <div  className='container' key={index} onClick={()=>handleClick(item.key)}>
         <div className="list">
         <p>{item.icon}</p> 
         <p>{item.label}</p>
         </div>
         </div>
       )
     })
    }
</div>
    </>
  )
}

export default Menu