import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from "../../../assets/css/author.module.css";
import ListItemComponent from '../../Components/ListItemComponent/ListItemComponent';

export default function Authors() {
    const [allAuthors, setAllAuthors] = useState([]);
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        (async () => {
          try {
            const dataFetched = await import("../../../services/author.service").then(
              async (service) => await service.getAuthors({skipItem: skip})
            );
            if (dataFetched.status === 200) {
              setAllAuthors(dataFetched.data.results);
              setPage(dataFetched.data.page);
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, [skip]);


      const previousPage = () => {
        if (skip >= 10) {
          setSkip(skip - 10)
        } else {
          toast.error("There is no previous page")
        }
      }

  return (
    <div className={`primaryBg ${styles.author}`}>
       <h3 className='mb-5 ms-3'>All Authors</h3>
       <Row>
        {
          allAuthors.length > 0 && allAuthors.map(data => (
              <ListItemComponent 
              key={data._id} 
              data={data} 
              />
          ))
        }
       </Row>
      <div className={styles.pagination}>
        <Button variant="primary" onClick={() => previousPage()}>Previous Page</Button>
        <div className='p-2 mx-2 bg-light border rounded'>
          Page no: {page}
        </div>
        <Button variant="primary" onClick={() => setSkip(skip + 10)}>Next Page</Button>
        
      </div>
    </div>
  )
}
