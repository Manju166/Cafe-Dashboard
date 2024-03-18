import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Select } from 'antd'
import { useQuery } from 'react-query'
import useAxiosPrivate from '../../Customhook/useAxiosPrivate'
import { apiRequest } from '../../api/api.services'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import './takeOrder.css';
function TakeOrder() {
    const history = useNavigate()
    const location = useLocation()
    const [menuList, setMenuList] = useState([])
    const [orderName,setOrderName] = useState('')
    const [paymentMethod,setPaymentMethod] = useState(null)
    const axiosPrivate = useAxiosPrivate()

    let { isError } = useQuery(
        ["get-menu"],
        () => {
            return apiRequest(axiosPrivate, {
                url: `/product/get?page=1&pageSize=20&sortBy=desc`,
            });
        },
        {
            onSuccess: (res) => {
                let tempData = res.data?.productList?.map(el => {
                    let newObj = {
                        ...el,
                        quantity: 0
                    }
                    return newObj
                })
                console.log(tempData)
                setMenuList(tempData)

            },
            onError: (e) => {
                if (e) {
                    toast("Error on fetching menu list")
                }
            },
        }
    );
    const handleDecrement = (item) => {
        let tempData = menuList.map((el) => {
            if (el.id == item.id) {
                if (!el.quantity == 0) {
                    return {
                        ...el,
                        quantity: el.quantity - 1
                    }
                } else {
                    return el
                }

            } else {
                return el
            }
        })
        setMenuList(tempData)
    }
    const handleIncrement = (item) => {
        let tempData = menuList.map((el) => {
            if (el.id == item.id) {
                return {
                    ...el,
                    quantity: el.quantity + 1
                }
            } else {
                return el
            }
        })
        setMenuList(tempData)
    }
    const handleSubmit = () => {
        let menu = menuList
        let myOrders = []
        menu.forEach((el)=> {
            if(el.quantity >0) {
                let newObj = {
                    productId: el.id,
                    price: el.price,
                    quantity: el.quantity

                }
                myOrders.push(newObj)
            
            }
        })
        let submitData = {
            orderName,
            paymentMethod,
            data: myOrders
        }
        takeOrderMutate(submitData)
        
    }

    const {
        mutate: takeOrderMutate,
      } = useMutation(
        (data) =>
          apiRequest(axiosPrivate, {
            url: `/order/place-order`,
            method: "post",
            data,
          }),
        {
          onSuccess: (res) => {
            toast("Order palced Sucessfully")
          },
           onError: (e) => {
            console.log("the errr",e)
          },
        }
    );

    return (
        <div className='dashboard_container'>

            <div className='text-dash'>
                <div>
                    <Button onClick={() => history(-1)} className='go-backbtn'>Go Back</Button>
                </div>
                <div className='category-heading'><h2>Take Order</h2></div>
                
         <div className='breadcrumb' style={{justifyContent:"end",display:"flex",position:"relative",right:"5rem"}}>
          <span>
            <Link to='/'>Home</Link>
          </span>/<span className={`${location.pathname === '/menu' && 'path-active'}`}> Take Order</span>
        </div>
                <div>
                    <div className='take-order-input'>
                        <p><Input placeholder='Order Name' value={orderName} onChange={(e) => setOrderName(e.target.value)} /></p>
                        <p><Select placeholder="Payment Type" value={paymentMethod} style={{ width: "100%" }} onChange={(e) => setPaymentMethod(e)}>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="online">Online</Select.Option>
                        </Select></p>
                    </div>
                    <div>
                        <div className='takeorder-item-header'>
                            <p>Name</p>
                            <p>Price</p>
                            <p>Quantity</p>
                        </div>
                    </div>
                    <div className='takeorder'>
                        {menuList?.map((item) => {
                            return (
                                <div className='takeorder-item'>
                                    <p>{item.name}</p>
                                    <p>Rs. {item.price}</p>
                                    <p><Button onClick={() => handleDecrement(item)}>-</Button> <span>{item?.quantity}</span> <Button onClick={() => handleIncrement(item)}>+</Button></p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='take-order-submit'>
                        <Button type='primary' onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TakeOrder