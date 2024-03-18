import React, { useEffect, useRef, useState } from 'react'
import cafelogo from '../../assets/cafelogo.jpg'
import '../Dashboarda.css'
import { useNavigate } from 'react-router'


 const Header = () => {
  const [showLogout,setLogout] = useState(false)
  const wrapperRef = useRef(null);
  const history = useNavigate()

    useEffect(() => {
      if (showLogout) {
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setLogout(!showLogout);
          }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [showLogout]);

  const handleLogout = ()=> {
      localStorage.removeItem('token')
      history('/login')
  }

  return (
    <div>
        <div className="header">
        <img src={cafelogo} alt="cafelogo" />
        <h1>Dashboard</h1>
        <div className="profile">
            <p onClick={()=> setLogout(true)}>Profile</p>
            <div className={ `${showLogout && 'active'}`} ref={wrapperRef} onClick={handleLogout}>
                <p>Log Out</p>
            </div>
        </div>
         
      </div>
    </div>
      )
  }
export default Header
