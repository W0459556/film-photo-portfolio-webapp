import dotenv from 'dotenv';
import express from 'express';
import film_photo from '../models/film_photo.js';
import multer from 'multer';
import path from 'path';

dotenv.config(); // env vars

const router = express.Router(); // router


// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../src/images'));
    },
    filename: (req, file, cb) => {
        if (!file.mimetype.includes('image/png')) {
            return cb(new Error('Only .png images are allowed!'));
        }
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Update photo details by ID
router.patch('/:id', upload.array('photos', 10), async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            film: {
                ...req.body.film,
                film_speed: parseInt(req.body.film.film_speed, 10),
            },
        };

        // If new photos are uploaded, add their paths to the photos array
        if (req.files && req.files.length > 0) {
            const photoPaths = req.files.map(file => `/images/${file.filename}`);
            updateData.photos = [...updateData.photos || [], ...photoPaths];
        }

        const updatedPhoto = await film_photo.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json(updatedPhoto);
    } catch (error) {
        res.status(400).json({ message: 'Error updating photo', error: error.message });
    }
});

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
        const data = await film_photo.findById(req.params.id).exec();
        if (!data) {
            return res.status(404).send();
        } else {
            res.json(data);
        }
    } catch (err) {
        res.status(500).send(err);
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