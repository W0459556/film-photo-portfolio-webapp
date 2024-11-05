import mongoose from "mongoose";

const { Schema, model } = mongoose;

const film_photoSchema = new Schema({
    film: {
        film_brand: {
            type: String,
            required: [true, 'Film brand is required'],
            maxlength: [50, 'Film brand must be less than 50 characters'],
            trim: true,
        },
        film_name: {
            type: String,
            required: [true, 'Film name is required'],
            maxlength: [100, 'Film name must be less than 100 characters'],
            trim: true,
        },
        film_speed: {
            type: Number,
            required: [true, 'Film speed (ISO) is required'],
            min: [1, 'Film speed must be at least 1'],
            max: [12800, 'Film speed must be less than or equal to 12800'],
        },
        film_type: {
            type: String,
            required: [true, 'Film type is required'],
            enum: ['Colour', 'Black & White', 'Negative'], 
        },
        film_processing: {
            type: String,
            required: [true, 'Film processing type is required'],
            enum: ['C-41', 'E-6', 'B&W', 'other'],
        },
        film_format: {
            type: String,
            required: [true, 'Film format is required'],
            enum: ['35mm', '120', 'large format', 'other'],
        },
    },
    camera: {
        camera_brand: {
            type: String,
            required: [true, 'Camera brand is required'],
            maxlength: [50, 'Camera brand must be less than 50 characters'],
            trim: true,
        },
        camera_body: {
            type: String,
            required: [true, 'Camera body model is required'],
            maxlength: [100, 'Camera body must be less than 100 characters'],
            trim: true,
        },
        camera_lens: {
            type: String,
            required: [true, 'Camera lens model is required'],
            maxlength: [100, 'Camera lens must be less than 100 characters'],
            trim: true,
        },
        camera_settings: {
            type: String,
            required: [true, 'Camera settings are required'],
            maxlength: [255, 'Camera settings must be less than 255 characters'],
            trim: true,
        },
    },
    comments: {
        type: String,
        maxlength: [500, 'Comments must be less than 500 characters'],
        trim: true,
    },
    photo_location: {
        type: String,
        maxlength: [100, 'Location must be less than 100 characters'],
        trim: true,
    },
    photos: [{
        type: String,
        required: [true, 'At least one photo is required'],
    }]
}, { collection: 'film-photography' });

const FilmPhoto = model('film_photo', film_photoSchema);
export default FilmPhoto;
