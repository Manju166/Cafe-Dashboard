import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './Redirect.css'
export default function Redirect() {
    const history= useNavigate();
    const [count,setCount]=useState(5)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount);
        },500);
        // Redirect to login page when count is zero
        count ===0 && history("/login");
        // cleanup
        return ()=> clearInterval(interval);
    });
  return (
    <>
      <div>
        <p>403-Unauthorized</p>
        <p>You are unauthorized. Please Login first.</p>
        <p>Redirecting in -<span>{count}</span></p>
      </div>
    </>
  )
}
