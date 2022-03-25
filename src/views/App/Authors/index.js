import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from "../../../assets/css/author.module.css";
import { AllContextData } from '../../../context';
import ListItemComponent from '../../Components/ListItemComponent/ListItemComponent';

export default function Authors() {
    const {favoriteList, setFavoriteList} = useContext(AllContextData);
    const [allAuthors, setAllAuthors] = useState([]);
    const [pagination, setPagination] = useState(10);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        (async () => {
          try {
            const dataFetched = await import("../../../services/author.service").then(
              async (service) => await service.getAuthors({})
            );
            if (dataFetched.status === 200) {
              setAllAuthors(dataFetched.data.results);
            } else {
              toast.warning("Something went wrong!")
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);

      useEffect(() => {
         localStorage.setItem("favorite-author", JSON.stringify(favoriteList))
      },[favoriteList])

  return (
    <div className={`primaryBg ${styles.author}`}>
       <h3 className='mb-5 ms-3'>All Authors</h3>
       <Row>
        {
          allAuthors.length > 0 && allAuthors.map(data => (
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
