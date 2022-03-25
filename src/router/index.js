import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Routes, Route, Navigate } from "react-router-dom";
import Authors from '../views/App/Authors';
import FavoriteAuthors from '../views/App/FavoriteAuthors';
import Sidebar from '../views/Components/Sidebar';

export default function Router() {
  return (
    <Row className='horizontalRootMrgn'>
      <Col md={3}>
          <Sidebar/>
      </Col>
      <Col md={9}>
         <Routes>
             <Route path='/' element={<Navigate to="/authors"/>}/>
             <Route path='/authors' element={<Authors/>}/>
             <Route path='/favorite-authors' element={<FavoriteAuthors/>}/>
         </Routes>
      </Col>
    </Row>
  )
}
