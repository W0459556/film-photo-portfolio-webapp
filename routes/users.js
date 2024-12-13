import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { passwordStrength } from 'check-password-strength';
import checkAuthToken from '../middleware/checkAuthToken.js';
import login from '../models/login.js';


const router = express.Router();

/* GET users listing. */
router.get('/', checkAuthToken, async (req, res) => {
    try {
        const data = await User.find(); 
        console.log('Retrieved data:', data); 
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use' });
  }


  const passwordCheck = passwordStrength(password);
  if (passwordCheck.value !== 'Medium' && passwordCheck.value !== 'Strong') {
    return res.status(422).json({
      message: 'Password not strong enough',
      requirements: 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters',
    });
  }

  try {
  
    const newUser = new User({ first_name, last_name, email, password });

  
    await newUser.validate();

  
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

  
    const savedUser = await newUser.save();

  
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);

  
    res.cookie('userEmail', savedUser.email, { httpOnly: false, path: '/' });
    res.cookie('token', token, { httpOnly: true, path: "/" });

    res.setHeader('Access-Control-Expose-Headers', '*');
    res.status(201).json({ email: savedUser.email, _id: savedUser._id });
  } catch (err) {
  
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        message: 'Validation error',
        details: err.errors,
      });
    }

  
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
});



  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      
        await login.validate(req.body);
    
      
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(401).send();
    
      
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(401).send();
    
      
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.cookie('userEmail', user.email, { httpOnly: false, path: '/' });

        res.cookie('token', token, { httpOnly: true, path: "/" });
        res.setHeader('Access-Control-Expose-Headers', '*');
        res.send();
      }catch(err){
        if(err.name === "ValidationError"){
          res.status(422).send(err);
        } else {
          console.log(err);
          res.status(500).send();
        }
      }
});

router.post('/logout', (req, res) => {
  res.status(204).send();
});

export default router;