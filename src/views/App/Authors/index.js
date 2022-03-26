import React, { useEffect, useState, Suspense } from 'react';
import { Button, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from "../../../assets/css/author.module.css";

// lazy load 
const ListItemComponent = React.lazy(() => import("../../Components/ListItemComponent/ListItemComponent"));

export default function Authors() {
    const [allAuthors, setAllAuthors] = useState([]);
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
        (async () => {
          try {
            const dataFetched = await import("../../../services/author.service").then(
              async (service) => await service.getAuthors({skipItem: skip})
            );
            if (dataFetched.status === 200) {
              setAllAuthors(dataFetched.data.results);
              setPage(dataFetched.data.page);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            setLoading(false);
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
      <Suspense fallback={<div>Loading...</div>}>
       <h3 className='mb-5 ms-3'>All Authors</h3>
       <Row>
        {
          (allAuthors.length > 0 && loading === false) ? allAuthors.map(data => (
              <ListItemComponent 
              key={data._id} 
              data={data} 
              />
          )) : (allAuthors.length === 0 && loading === false) ? (
            <h6>There is no author!!</h6>
          ) : (allAuthors.length === 0 && loading === true) && (
            <div><Spinner animation="border" variant="secondary" />Loading...</div>
          )
        }
       </Row>
      <div className={styles.pagination}>
        <Button variant="primary" onClick={() => previousPage()}>Previous Page</Button>
        <div className='p-2 mx-2 bg-light border rounded'>
          Page no: {page}
        </div>
        <Button variant="primary" onClick={() => setSkip(skip + 10)}>Next Page</Button>
      </div>
      </Suspense>
    </div>
  )
}
