import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const CreateForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
        const photoFile = data.photos[0]; 
        console.log(photoFile.name);
        data.photos = [photoFile.name];
  
      authService.createForm(data, (success) => {
        if (success) {
          navigate('/'); 
        } else {
          console.log('Upload failed.');
        }
      });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container my-5'>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <h3>Film</h3>
              <label htmlFor="filmBrand">Film Brand</label>
              <input
                type="text"
                name="filmBrand"
                id="filmBrand"
                className="form-control"
                placeholder="Enter film brand"
                {...register('film.film_brand', { required: 'Film brand is required' })}
              />
              {errors.film?.film_brand && <small className="text-danger">{errors.film.film_brand.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="filmName">Film Name</label>
              <input
                type="text"
                name="filmName"
                id="filmName"
                className="form-control"
                placeholder="Enter film name"
                {...register('film.film_name', { required: 'Film name is required' })}
              />
              {errors.film?.film_name && <small className="text-danger">{errors.film.film_name.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="filmSpeed">Film Speed (ISO)</label>
              <input
                type="number"
                name="filmSpeed"
                id="filmSpeed"
                className="form-control"
                placeholder="Enter film speed"
                {...register('film.film_speed', { 
                  required: 'Film speed is required',
                  min: { value: 1, message: 'Film speed must be at least 1' },
                  max: { value: 12800, message: 'Film speed must be at most 12800' }
                })}
              />
              {errors.film?.film_speed && <small className="text-danger">{errors.film.film_speed.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="filmType">Film Type</label>
              <select
                name="filmType"
                id="filmType"
                className="form-control"
                {...register('film.film_type', { required: 'Film type is required' })}
              >
                <option value="">Select film type</option>
                <option value="Colour">Colour</option>
                <option value="Black & White">Black & White</option>
                <option value="Negative">Negative</option>
              </select>
              {errors.film?.film_type && <small className="text-danger">{errors.film.film_type.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="filmProcessing">Processing Type</label>
              <select
                name="filmProcessing"
                id="filmProcessing"
                className="form-control"
                {...register('film.film_processing', { required: 'Processing type is required' })}
              >
                <option value="">Select processing type</option>
                <option value="C-41">C-41</option>
                <option value="E-6">E-6</option>
                <option value="B&W">B&W</option>
                <option value="other">Other</option>
              </select>
              {errors.film?.film_processing && <small className="text-danger">{errors.film.film_processing.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="filmFormat">Film Format</label>
              <select
                name="filmFormat"
                id="filmFormat"
                className="form-control"
                {...register('film.film_format', { required: 'Film format is required' })}
              >
                <option value="">Select film format</option>
                <option value="35mm">35mm</option>
                <option value="120">120</option>
                <option value="large format">Large Format</option>
                <option value="other">Other</option>
              </select>
              {errors.film?.film_format && <small className="text-danger">{errors.film.film_format.message}</small>}
            </div>

          </div>

          <div className="col-md-6">
            <h3>Camera</h3>
            <div className="form-group">
              <label htmlFor="cameraBrand">Camera Brand</label>
              <input
                type="text"
                name="cameraBrand"
                id="cameraBrand"
                className="form-control"
                placeholder="Enter camera brand"
                {...register('camera.camera_brand', { required: 'Camera brand is required' })}
              />
              {errors.camera?.camera_brand && <small className="text-danger">{errors.camera.camera_brand.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="cameraBody">Camera Body Model</label>
              <input
                type="text"
                name="cameraBody"
                id="cameraBody"
                className="form-control"
                placeholder="Enter camera body model"
                {...register('camera.camera_body', { required: 'Camera body model is required' })}
              />
              {errors.camera?.camera_body && <small className="text-danger">{errors.camera.camera_body.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="cameraLens">Camera Lens</label>
              <input
                type="text"
                name="cameraLens"
                id="cameraLens"
                className="form-control"
                placeholder="Enter camera lens model"
                {...register('camera.camera_lens', { required: 'Camera lens is required' })}
              />
              {errors.camera?.camera_lens && <small className="text-danger">{errors.camera.camera_lens.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="cameraSettings">Camera Settings</label>
              <input
                type="text"
                name="cameraSettings"
                id="cameraSettings"
                className="form-control"
                placeholder="Enter camera settings"
                {...register('camera.camera_settings', { required: 'Camera settings are required' })}
              />
              {errors.camera?.camera_settings && <small className="text-danger">{errors.camera.camera_settings.message}</small>}
            </div>

            <div className="form-group">
            <label htmlFor="photoLocation">Photo Location</label>
            <input
              type="text"
              name="photoLocation"
              id="photoLocation"
              className="form-control"
              placeholder="Enter photo location"
              {...register('photo_location')}
            />
            {errors.photo_location && <small className="text-danger">{errors.photo_location.message}</small>}
          </div>
          </div>
        </div>

        <div className="col-md-12">
          {/* Comments */}
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              name="comments"
              id="comments"
              className="form-control"
              placeholder="Enter any additional comments"
              {...register('comments')}
            />
          </div>

            <div className="form-group">
              <label htmlFor="photoUpload">Upload your photo</label>
              <input
                type="file"
                name="photoUpload"
                id="photoUpload"
                className="form-control"
                {...register('photos', { required: 'Photo is required' })}
              />
              {errors.photos && <small className="text-danger">{errors.photos.message}</small>}
            </div>

          <button className="btn btn-lg btn-primary btn-block mb-5" type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
