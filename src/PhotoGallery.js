// src/PhotoGallery.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('/api/photos'); // Fetch from your API
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Photo Gallery</h2>
            <div className="row">
                {photos.map((photo, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <img
                                src={`./images/${photo.photos[0]}`} // Adjust path as needed
                                className="card-img-top"
                                alt={`Photo by ${photo.camera.camera_brand} ${photo.camera.camera_body}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Film: {photo.film.film_name}</h5>
                                <p className="card-text">Brand: {photo.film.film_brand}<br />
                                    Comments: {photo.comments}<br />
                                    Location: {photo.photo_location}
                                </p>
                                <a href={`./images/${photo.photos[0]}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    View Full Image
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
