import React, { Suspense, useContext } from 'react'
import { Row } from 'react-bootstrap';
import { AllContextData } from '../../../context';

//lazy load component
const ListItemComponent = React.lazy(() => import("../../Components/ListItemComponent/ListItemComponent"));


export default function FavoriteAuthors() {
  const {favoriteList} = useContext(AllContextData);
  

  return (
    <div className="primaryBg" style={{paddingTop: "50px"}}>
      <Suspense fallback={<div>Loading...</div>}>
       <h3 className='mb-5 ms-3'>Your Favorite Authors</h3>
       <Row>
        {
          favoriteList.length > 0 ? favoriteList.map(data => (
              <ListItemComponent 
              key={data._id} 
              data={data} 
              />
          )) : (favoriteList.length === 0) && (
            <h5 className='text-muted'>You have no favorite author!</h5>
          )
        }
       </Row>
      </Suspense>
    </div>
  )
}
