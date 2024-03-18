import React from 'react'
import { useForm} from "react-hook-form"
import {useMutation} from 'react-query';
import cafeImg from '../assets/restaurantimg.webp'
import useAxiosPrivate from '../Customhook/useAxiosPrivate';
import {apiRequest} from '../api/api.services'
import useLocalStorage from '../Customhook/useLocalStorage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
  const history = useNavigate()
  const [value,setValue]=useLocalStorage('token')
    const axiosPrivate=useAxiosPrivate()
    const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm();
    
    const handleLogin = (data) => {
      mutateLogin(data)
    }
      const {
        mutate: mutateLogin,
        isLoading,
        // data,
      } = useMutation(
        (data) =>
          apiRequest(axiosPrivate, {
            url: `user/login`,
            method: "post",
            data,
          }),
        {
          onSuccess: (resp) => {
            toast("Login successfull !!")
            history('/*')
            localStorage.setItem("token",resp.data.token)
          },
           onError: (e) => {
            console.log("the errr",e)
        },
    }
      );
      
  return (
    <>
    <div className="login">
        <div className="login-container">
            <div className="login-img">
                <img src={cafeImg} alt="restimg" />
            </div>
            <div className="login-text">
                <h1>Welcome to the Cafe</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='input-field'>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' {...register("email", { required: true})}  />
                    {errors.email && <span>Email is required</span>}
                    </div>
                    <div className='input-field'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' {...register("password", { required: true, maxLength: 8 })} />
                    {errors.password && <span>Password is required</span>}

                    </div>
                    <button type='submit' className='signinbtn'>SIGN IN</button>
                    {isLoading?"Loading..." :""}
                      <p>Forget Username/Password</p>
                    <div className="signupbtn">
                    <h3>Sign Up</h3>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
export default  Login;
