import axios from "axios";

class authService{
    async register(registerData, callback){
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, registerData, { withCredentials: true }); 
            switch(response.status){
                case 201:{
                    sessionStorage.setItem(`isLoggedIn`, `true`);
                    callback(true);
                    break;
                }
                case 401:{
                    callback(false);
                    break;
                }
                case 500:{
                    callback(false);
                    break;
                }
                case 209:{
                    callback(false);
                    break;
                }
            }        
        }catch(err){ 
            console.log("error ", err);
        }
    }
    
    async signIn(loginData, callback){
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, loginData, { withCredentials: true }); 
            switch(response.status){
                case 200:{
                    sessionStorage.setItem(`isLoggedIn`, `true`);
                    callback(true);
                    break;
                }
                case 401:{
                    callback(false);
                    break;
                }
                case 500:{
                    callback(false);
                    break;
                }
            }        
        }catch(err){ 
            console.log("error");
        }
    }


    async signOut(){
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`);
            if(response.status === 204){
                callback(true);
            }else{
                callback(false);
            }
        }catch{
            console.log("error");
        }
    }


    async createForm(filmData, callback){
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/photos`, filmData, { withCredentials: true });

            switch (response.status) {
                case 201: {
                    callback(true); 
                    break;
                }
                case 400: {
                    callback(false);
                    break;
                }
                case 500: {
                    callback(false);
                    break;
                }
            }
        }catch(err){
            console.error("Error during film data submission", err);
            callback(false);  
        }
    }

    isSignedIn(){
        return(sessionStorage.getItem(`isLoggedIn`) == "true");
    }

    async getPhotoById(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/photos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (!data || typeof data !== 'object' || !data._id) {
                throw new Error('Invalid data structure returned from API');
            }
    
            return { data };
        } catch (error) {
            console.error('Error fetching photo by ID:', error);
            throw error;
        }
    }
    
    
      async updatePhoto(id, photoData) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/photos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
          });
    
          if (!response.ok) {
            throw new Error(`Error updating photo with ID ${id}: ${response.statusText}`);
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error in updatePhoto:', error);
          throw error;
        }
      }
    
      
      async createPhoto(photoData) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/photos/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
          });
    
          if (!response.ok) {
            throw new Error(`Error creating photo: ${response.statusText}`);
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error in createPhoto:', error);
          throw error;
        }
      }

      async deletePhoto(id, callback) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/photos/${id}`, { withCredentials: true });
    
            if (response.status === 202) {
                callback(true);
            } else {
                callback(false);
            }
        } catch (err) {
            console.error("Error deleting photo", err);
            callback(false);
        }
    }
    };


export default new authService();