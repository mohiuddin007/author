import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ListItemComponent({data, favoriteList, setFavoriteList}) {

    const redirect = (link) => {
        window.open(link, '_blank');
    }

    const addToFavt = (item) => {
        const isAlreadyInList = favoriteList.filter(data => data._id === item._id);
        if (isAlreadyInList.length > 0) {
            toast.warning("Already added to the favorite list!")
        } else {
            setFavoriteList([
                ...favoriteList,
                item
            ]);
            localStorage.setItem("favorite-author", JSON.stringify([...favoriteList, item]))
            toast.success("Added to the favorite list")
        }
    }

    const removeFavt = (item) => {
       const removedItem = favoriteList.filter(data => data._id !== item._id);
       setFavoriteList(removedItem);
       localStorage.setItem("favorite-author", JSON.stringify(removedItem))
       toast.success("Removed from favorite list!");
    }

  return (
    <Col md={6}>
      <Card style={{marginBottom: "24px"}}>
        <Card.Body>
            <Card.Title>Name:{data.name}</Card.Title>
            <Card.Text style={{height: "145px", overflow: "hidden"}}>
             Bio: {data.bio}
            </Card.Text>
            <div className="d-flex justify-content-between">
                <Button variant="info" onClick={() => redirect(data.link)}>Know more</Button> 
                {
                    favoriteList.filter(item => item._id === data._id).length > 0 ? (
                        <Button variant="danger" onClick={() => removeFavt(data)}>Remove favorite</Button>
                    ) : (
                        <Button variant="outline-success" onClick={() => addToFavt(data)}>Add to favorite</Button>
                    )
                }
                
            </div>
        </Card.Body>
      </Card>
    </Col>
  )
}
