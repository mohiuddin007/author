import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Routes, Route, Navigate } from "react-router-dom";
import Authors from '../views/App/Authors';
import FavoriteAuthors from '../views/App/FavoriteAuthors';
import Sidebar from '../views/Components/Sidebar';

export default function Router() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Row className='horizontalRootMrgn'>
      <Col md={collapsed === true ? 2 : 3}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      </Col>
      <Col md={collapsed === true ? 10 : 9}>
          {/* sidebar manage for responsive design */}
         {
           window.screen.width < 746 && ( 
            <div onClick={() => setCollapsed(!collapsed)} style={{cursor: "pointer", padding: "20px 0px 0px 20px"}}>
                <GiHamburgerMenu/>  
            </div>
            )
         }
         <Routes>
             <Route path='/' element={<Navigate to="/authors"/>}/>
             <Route path='/authors' element={<Authors/>}/>
             <Route path='/favorite-authors' element={<FavoriteAuthors/>}/>
         </Routes>
      </Col>
    </Row>
  )
}
