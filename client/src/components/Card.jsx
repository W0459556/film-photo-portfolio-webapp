import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService'; 

const Card = ({ photo, removePhoto }) => {
  
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this photo?")){
      authService.deletePhoto(id, (success) => {
        if(success){
          removePhoto(id); 
        } else {
          alert("Failed to delete the photo");
        }
      });
    }
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img 
          className="card-img-top" 
          style={{height: 225, width: '100%', display: 'block'}}
          src={`/images/${photo.photos[0]}`}
          data-holder-rendered="true" />
        <div className="card-body">
          <p className="card-text">
            {`Film: ${photo.film.film_brand} ${photo.film.film_name}, ${photo.film.film_speed} ISO, ${photo.film.film_format}.`}<br />
            {`Location: ${photo.photo_location}`}<br />
            {`Camera: ${photo.camera.camera_brand} ${photo.camera.camera_body}`}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-success">View</button>
              <Link to={`/edit/${photo._id}`} className="btn btn-warning">Edit</Link>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(photo._id)}>
                Delete
              </button>
            </div>
            <small className="text-muted"><i class="fa fa-camera rainbow"></i></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
