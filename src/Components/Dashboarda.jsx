import React from 'react'
import './Dashboarda.css'
import {Space} from "antd";
import Header from './PageHeader/Header'
import Menu from './SideMenu/Menu'
import Content from './PageContent/Content'
import Footer from './PageFooter/Footer'

function Dashboarda() {
  return (
    <>
        <div className="dash">
            <Header/>
            <Space className='space'>
                <Menu/>
                <Content/>
            </Space>
                <Footer/>
        </div>
    </>
  )
}

export default Dashboarda