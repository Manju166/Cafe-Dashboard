
import React, { useState } from 'react'
import { Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../Customhook/useAxiosPrivate';
import { useQuery, useQueryClient } from 'react-query';
import {useMutation} from 'react-query';
import { apiRequest } from '../../api/api.services'
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import {Controller, useForm} from 'react-hook-form'
import {Form,Input} from 'antd'
const Category = () => {
  const{control,
    handleSubmit,
    reset,
    formState: {errors},
  }=useForm();
  const queryClient = useQueryClient()
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const columns = [
    {
      title: 'S.N',
      dataIndex: 'id',
      key: 'id',
    },
    {
     title: 'Name',
     dataIndex: 'name',
     key: 'name',
   },
   {
     title: 'Description',
     dataIndex: 'description',
     key: 'description',
   },
   {
     title: 'Action',
     dataIndex: 'action',
     align: "center",
     key: 'action',
     render: (_,data) =>{
       return(
         <div className='category-button'>
           <Button onClick={()=>{
            setUpdateData(data)
            reset(data)
            showModal();
           }}>Edit</Button>
           <Button onClick={()=>setDataDelete(data)}>Delete</Button>
         </div>
       )
     }
    },
  ];
  const [categoryList,setCategoryList] = useState([])
  const [paginationOption,setPaginationOption] = useState({
    total: 0,
    pageSize: 4,
    current:1,
    showSizeChanger: true,
  })
  const handleChange =(pagination)=>{
    setPaginationOption(pagination)
  }
  let { isError } = useQuery(
    ["get-category",paginationOption],
    () => {
      return apiRequest(axiosPrivate,{
        url:`/category/get-category?page=${paginationOption.current}&pageSize=${paginationOption.pageSize}&sortBy=desc`,
      });
    },
    {
    onSuccess: (res)=>{
      setCategoryList(res.data?.categoryList)

      // console.log("the res",res)
    },
    onError: (e) =>{
      // console.log("the error",e)
      if (e){
        toast("Error on fetching category list")
      }
    },
  }
  );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
  setIsModalOpen(true);
};
const closeModel = () => {
  setIsModalOpen(false);
};
const addCategory=(data)=>{
  addCategoryMutate(data)
}
const {
  mutate: addCategoryMutate,
} = useMutation(
  (data) =>
  apiRequest(axiosPrivate, {
    url: `category/addCategory`,
    method: "post",
    data,
  }),
  {
    onSuccess: (resp) => {
      toast("Category Added Successfull !!")
        setIsModalOpen(null)
        queryClient.invalidateQueries("get-category")
      },
      onError: (e) => {
        console.log("the errr",e)
      },
    }
    );
    
    const [updateData,setUpdateData]=useState(null)
    const updateCategory=(data)=>{
      let tempData ={
        id:updateData.id,
        ...data
      }
      updateCategoryMutate(tempData)
    }
    const {
      mutate: updateCategoryMutate,
    } = useMutation(
      (data) =>
      apiRequest(axiosPrivate, {
        url: `category/update`,
        method: "put",
        data,
      }),
      {
        onSuccess: (resp) => {
          toast("Category Updated Successfull !!")
          closeModel();
          queryClient.invalidateQueries("get-category")
        },
        onError: (e) => {
          console.log("the errr",e)
        },
      }
      );
      // for Delete function
      const [dataDelete,setDataDelete]=useState(null)
      const handleDelete=()=>{
            deleteCategoryMutate()}
      const closeDeleteModel=()=>{
            setDataDelete(null);
            }
 const {
  mutate: deleteCategoryMutate,
} = useMutation(
  (data) =>
    apiRequest(axiosPrivate, {
      url: `category/delete/${dataDelete?.id}`,
      method: "delete",
    }),
  {
    onSuccess: (resp) => {
      toast("Category deleted Successfull !!")
      // closeModel();
      setDataDelete(null);
      queryClient.invalidateQueries("get-category")
    },
     onError: (e) => {
      console.log("the errr",e)
  },
}
)

  return (
     <div className='category_container'>
      <div className='text-cat'>
      
        <div className='category-heading'>
           <div>
           <h2>Category</h2>
          <div className='breadcrumb' style={{justifyContent:"end",display:"flex",position:"relative",right:"5rem"}}>
          <span>
            <Link to='/'>Home</Link>
          </span>/<span className={`${location.pathname === '/category' && 'path-active'}`}> Category</span>
          
        </div>
          </div>
     
          <div className='addcategory'>
          <Button type="primary" onClick={showModal}>
           Add Category
         </Button>
         <Modal title={updateData ? 'Update Category' : "Add Category"} open={isModalOpen} footer="" onCancel={closeModel} >
        <Form onFinish={handleSubmit( updateData? updateCategory: addCategory)}>

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
          <Form.Item label="Description">
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Description" style={{ marginTop: "10px" }} />
              )}
            />
          </Form.Item>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
            <Button onClick={closeModel}>Cancel</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Modal>
      
      <Modal title="Delete Category" open={dataDelete ? true : false} 
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
  )
}


export default Category