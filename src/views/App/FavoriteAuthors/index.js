import React, { useContext, useEffect } from 'react'
import { Row } from 'react-bootstrap';
import { AllContextData } from '../../../context';
import ListItemComponent from '../../Components/ListItemComponent/ListItemComponent'

export default function FavoriteAuthors() {
  const {favoriteList, setFavoriteList} = useContext(AllContextData);
  const favoriteAuthorList = JSON.parse(localStorage.getItem("favorite-author"));

  useEffect(() => {
    localStorage.setItem("favorite-author", JSON.stringify(favoriteList))
 },[favoriteList])

  return (
    <div className="primaryBg" style={{paddingTop: "50px"}}>
       <h3 className='mb-5 ms-3'>Your Favorite Authors</h3>
       <Row>
        {
          favoriteAuthorList.length > 0 && favoriteAuthorList.map(data => (
              <ListItemComponent 
              key={data._id} 
              data={data} 
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}/>
          ))
        }
       </Row>
     
    </div>
  )
}
