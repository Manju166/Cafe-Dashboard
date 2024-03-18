import React from 'react';
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Category from "../../Pages/Category/Category";
import MenuItem from '../../Pages/MenuList/MenuItem'
import OrderList from '../../Pages/OrderList/OrderList';
import Report from "../../Pages/Report/Report";
import { Routes, Route } from "react-router"; 
import TakeOrder from '../../Pages/Order/TakeOrder';
import OrderDetail from '../../Pages/OrderList/OrderDetail';
function AppRoutes(){
  return(
    <>
    <Routes>
      <Route path='/*' element={<Dashboard/>}/>
      <Route path="/category" element={<Category />}/>
      <Route path="/menuItem" element={<MenuItem />}/>
      <Route path="/orders" element={<OrderList />}/>
      <Route path="/reports" element={<Report />}/>
      <Route path='/takeorder' element={<TakeOrder/>}/>
      <Route path='/order-details/:orderId' element={<OrderDetail/>}/>
      
    </Routes>
    </>
  )
}
export default AppRoutes;