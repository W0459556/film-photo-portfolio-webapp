import React, { useEffect, useState } from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import Card from './Card';

const Main = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]); 
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/photos`)
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); 
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term); 

    const filtered = data.filter(photo => {
      const location = photo.photo_location ? photo.photo_location.toLowerCase() : '';
      const comments = photo.comments ? photo.comments.toLowerCase() : '';
      return location.includes(term) || comments.includes(term); 
    });
    
    setFilteredData(filtered); 
  };

  return ( 
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search location or comments" 
              value={searchTerm} 
              onChange={handleSearch} 
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {filteredData.map(photo => (
              <Card key={photo._id} photo={photo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
