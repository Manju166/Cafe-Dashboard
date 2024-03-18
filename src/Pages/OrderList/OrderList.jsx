import React,{useState} from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { Button,Modal,Table} from 'antd'
import { apiRequest } from '../../api/api.services'
import useAxiosPrivate from '../../Customhook/useAxiosPrivate'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'

 const OrderList = () => {
    const location = useLocation()
    const queryClient=useQueryClient()
    const history = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [orderList,setOrderList] = useState([])
    const [paginationOption, setPaginationOption] = useState({
        total: 0,
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        
    })
    
    let { isError } = useQuery(
        ["get-menu"],
        () => {
            return apiRequest(axiosPrivate, {
                url: `/order/get-order?page=${paginationOption.current}&pageSize=${paginationOption.pageSize}&sortBy=asc`,
            });
        },
        {
            onSuccess: (res) => {
                setOrderList(res.data?.orderList)
                
            },
            onError: (e) => {
                if (e) {
                    toast("Error on fetching order list")
                }
            },
        }
        );
        
        const columns = [
            {
                title: 'S.N.',
                dataIndex: 'order_id',
                key: 'order_id',
            },
            {
                title: 'Order Name',
                dataIndex: 'order_name',
                key: 'order_name',
            },
            {
                title: 'Order Method',
                dataIndex: 'payment_method',
                key: 'payment_method',
            },
            {
                title: 'Total Amount',
                dataIndex: 'total_amount',
                key: 'total_amount',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                align: "center",
                key: 'action',
                render: (_, data) => {
                    return (
                        <div className='category-buttons'>
                <Button onClick={()=> setCancelOrder(data)} >Cancel</Button>
                <Button onClick={()=>setCompleteOrder(data)}>Complete</Button>
                <Button onClick={()=> {
                    history(`/order-details/${data.order_id}`)
                }}>View Details</Button>
            </div>
            )
        }
    },
];
const closeCancelModal=()=>{
    setCancelOrder(null)
}
const closeCompleteModal=()=>{
    setCompleteOrder(null)
}

// Cancel order
const [cancelOrder,setCancelOrder]=useState(null)
const handleCancelOrder=()=>{
    cancelOrderMutate()
}
const {
    mutate: cancelOrderMutate,
} = useMutation(
    (data) =>
    apiRequest(axiosPrivate, {
        url: `order/change-status/${cancelOrder?.order_id}?status=CANCEL`,
        method: "put",
    }),
    {
        onSuccess: (resp) => {
            toast("Order cancel Successfull !!")
            closeCancelModal()
            queryClient.invalidateQueries("get-order")
        },
        onError: (e) => {
            console.log("the errr",e)
        },
    }
    )
    //  for Complete Order
    const [completeOrder,setCompleteOrder]=useState(null)
    const handleCompleteOrder=()=>{
        completeOrderMutate()
  }
const {
    mutate: completeOrderMutate,
  } = useMutation(
    (data) =>
      apiRequest(axiosPrivate, {
        url: `order/change-status/${completeOrder?.order_id}?status=COMPLETE`,
        method: "put",
      }),
    {
      onSuccess: (resp) => {
        toast("Order completed Successfull !!")
        closeCompleteModal()
        queryClient.invalidateQueries("get-order")
      },
       onError: (e) => {
        console.log("the errr",e)
    },
  }
  )
  
  return (
    <>
        <div className='dashboard_container'>
            <div className='text-dash'>
            <div className='category-heading'>
            <h2>Order List</h2></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="breadcrumb" style={{justifyContent:"end",display:"flex",marginLeft:"20px",alignItems:"center"}}>
                    <span><Link to='/'>Home</Link></span> / <span className={`${location.pathname === '/menu' && 'path-active'}`}> Take List</span>
                </div>
                <div style={{ marginRight: "30px" ,marginTop:"40px"}}>
                    <Link to='/takeorder'><Button type="primary">Take Order</Button></Link>
                </div>

            </div>
            <div>
                <Table dataSource={orderList} columns={columns}/>
            </div>
            </div>
        </div>
        <Modal title="Cancel Order" open={cancelOrder ? true : false} 
      onCancel={closeCancelModal} 
      onOk={handleCancelOrder}>
        <p>Are you sure want to Cancel this order ?</p>
      </Modal>
        <Modal title="Cancel Order" open={completeOrder ? true : false} 
      onCancel={closeCancelModal} 
      onOk={handleCompleteOrder}>
        <p>Are you sure want to Complete this order ?</p>
      </Modal>
    </>
  )
}
export default OrderList
