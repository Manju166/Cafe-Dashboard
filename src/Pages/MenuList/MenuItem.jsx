import React,{useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useQueryClient, useQuery } from 'react-query'
import useAxiosPrivate from '../../Customhook/useAxiosPrivate';
import { apiRequest } from '../../api/api.services'
import {useMutation} from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal, Table} from 'antd';
import {Controller, useForm} from 'react-hook-form'
import {Form,Input,Select} from 'antd'
 const MenuItem = () => {
  const{control,
    handleSubmit,
    reset,
    formState: {errors},
  }=useForm();
    const queryClient = useQueryClient()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const { TextArea } = Input;
    const { Option } = Select;
    const columns=[
        {
          title:"S.L",
          dataIndex:"sl.",
          key:"id",
        },
        {
          title:"Name",
          dataIndex:"name",
          key:"name",
        },
        {
          title:"Category",
          dataIndex:"category",
          key:"categoryName",
        },
        {
     title: 'Description',
     dataIndex: 'description',
     key: 'description',
   },
        {
          title:"Price",
          dataIndex:"price",
          key:"price",
        },
        {
          title:"Action",
          dataIndex:"action",
          key:"action",
          render: (_, data) =>{
            return(
                <div className="menu-btn">
                    <button onClick={()=> handleEdit(data)}>Edit</button>
                    <button onClick={()=>setDeletes(data)} >Delete</button>
                </div>
            )
          }
        },
      ];

      const handleEdit = (data)=>{
        let tempData = data
        tempData.categoryId = tempData.id
        reset(tempData)
        console.log("the tempdata",tempData)
        setUpdateData(data)
        menuModal();
      }

         const [categoryList,setCategoryList] = useState([])
         console.log("categoryListcategoryList",categoryList)
         const [paginationOption,setPaginationOption] = useState({
    total: 0,
    pageSize : 4,
    current:1,
    showSizeChanger: true,
  })
  const handleChange =(pagination)=>{
    setPaginationOption(pagination)
  }

  // api calls
  let { isError } = useQuery(
    ["get-category",paginationOption],
    () => {
      return apiRequest(axiosPrivate,{
        url:`/category/get-category?page=1&pageSize=20&sortBy=desc`,
      });
    },
    {
    onSuccess: (res)=>{
      
      setCategoryList(res.data?.categoryList)
      setPaginationOption({
        ...paginationOption,
        total: res.data?.totalData
      })
      console.log("the res",res)
    },
    onError: (e) =>{
      // console.log("the error",e)
      if (e){
        toast("Error on fetching Menu list")
      }
    },
  }
  );
  let { isErrors } = useQuery(
    ["get-menu",paginationOption],
    () => {
      return apiRequest(axiosPrivate,{
        url:`/product/get?page=1&pageSize=10`,
      });
    },
    {
    onSuccess: (res)=>{
      
      setCategoryList(res.data?.productList)
      setPaginationOption({
        ...paginationOption,
        total: res.data?.totalData
      })
      console.log("the res",res)
    },
    onError: (e) =>{
      // console.log("the error",e)
      if (e){
        toast("Error on fetching Menu list")
      }
    },
  }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuModal = () => {
  setIsModalOpen(true);
};
const closeModel = () => {
  setIsModalOpen(false);
};
const addMenu=(data)=>{
  console.log(data)
  addMenuMutate(data)
}
const {
  mutate: addMenuMutate,
} = useMutation(
  (data) =>
  apiRequest(axiosPrivate, {
    url: `product/add`,
    method: "post",
    data,
  }),
  {
    onSuccess: (resp) => {
      toast("MenuItem Added Successfull !!")
        setIsModalOpen(null)
        queryClient.invalidateQueries("get-menu")
      },
      onError: (e) => {
        console.log("the errr",e)
      },
    }
    );
    
    const [updateData,setUpdateData]=useState(null)
    console.log("updateDataupdateData",updateData)
    const updateMenu=(data)=>{
      let tempData ={
        id:updateData.id,
        ...data
      }
      updateMenuMutate(tempData)
    }
    const {
      mutate: updateMenuMutate,
    } = useMutation(
      (data) =>
      apiRequest(axiosPrivate, {
        url: `product/update`,
        method: "put",
        data,
      }),
      {
        onSuccess: (resp) => {
          toast("MenuItem Updated Successfull !!")
          closeModel();
          queryClient.invalidateQueries("get-menu")
        },
        onError: (e) => {
          console.log("the errr",e)
        },
      }
      );
      // for Delete function
      const [deletes,setDeletes]=useState(null)
      const handleDelete=()=>{
            deleteMenuMutate()}
      const closeDeleteModel=()=>{
            setDeletes(null);
            }

      const {
  mutate: deleteMenuMutate,
} = useMutation(
  (data) =>
    apiRequest(axiosPrivate, {
      url: `product/delete/${deletes?.id}`,
      method: "delete",
    }),
  {
    onSuccess: (resp) => {
      toast("MenuItem deleted Successfull !!")
      // closeModel();
      setDeletes(null);
      queryClient.invalidateQueries("get-menu")
    },
     onError: (e) => {
      console.log("the errr",e)
  },
}
)
  return (
    <>
       <div className='menu_container'>
      <div className='text-menu'>
      
        <div className='menu-heading'>
           <div>
           <h1>
            Menu
           </h1>
          <div className='breadcrumb' style={{justifyContent:"end",display:"flex",position:"relative",right:"5rem"}}>
          <span>
            <Link to='/'>Home</Link>
          </span>/<span className={`${location.pathname === '/menuItem' && 'path-active'}`}> Menu</span>
        </div>
          </div>

          {/* Add Modal */}
          <div className='addmenu'>
          <Button type="primary" onClick={menuModal}>
           Add Menu
         </Button>
         <Modal title={updateMenu ? 'Add Menu' : "Update Menu"} open={isModalOpen} footer="" onCancel={closeModel} >
        <Form onFinish={handleSubmit( updateData? updateMenu: addMenu)}>

          <Form.Item label="Name">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Name" style={{ marginTop: "10px" }} />
              )}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
               <Select {...field} placeholder="Select Category">
               {categoryList.map((item)=>{
                return(
            <Option value={item.id}>{item.name}</Option>
                )
               })}
          </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea rows={4} {...field} placeholder="Description" style={{ marginTop: "10px" }} />
              )}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} type='number' placeholder="Price" style={{ marginTop: "10px" }} />
              )}
            />
          </Form.Item>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
            <Button onClick={closeModel}>Cancel</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Modal>
      
      {/* Delete function */}
      <Modal title="Delete Category" open={deletes ? true : false} 
      onCancel={closeDeleteModel} 
      onOk={handleDelete}>
        <p>Are you sure want to delete ?</p>
      </Modal>
            </div>
          </div> 
     
        <div className='category-table'>
        <Table dataSource={categoryList} columns={columns} pagination={paginationOption}
        onChange={handleChange}
        />
        </div> 
      </div>
      </div>
    </>
  )
}

export default MenuItem
