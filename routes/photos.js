import dotenv from 'dotenv';
import express from 'express';
import film_photo from '../models/film_photo.js';

dotenv.config(); // env vars

const router = express.Router(); // router

// get all film photos
router.get('/', async (req, res) => {
    try {
        const data = await film_photo.find(); 
        console.log('Retrieved data:', data); 
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});


router.get('/:id', async (req, res) => {
    try {
        const photo = await film_photo.findById(req.params.id).exec();
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.status(200).json(photo);
    } catch (err) {
        console.error(`Error retrieving photo with ID ${req.params.id}:`, err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const film_photoNew = new film_photo(req.body); // create new model from scratch
        const document = await film_photoNew.save();
        res.status(201).json(document);
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(422).send(err);
        } else {
            res.status(500).send(err);
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const photoToDelete = await film_photo.findByIdAndDelete(req.params.id).exec();
        if (!photoToDelete) {
            return res.status(404).send();
        } else {
            res.status(202).json({ message: 'Photo deleted successfully' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPhoto = await film_photo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
        
        if (!updatedPhoto) {
            return res.status(404).send();
        } else {
            res.status(200).json(updatedPhoto);
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(422).send(err);
        } else {
            res.status(500).send(err);
        }
    }
});

export default router;