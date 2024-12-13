import jwt from 'jsonwebtoken';

const checkAuthToken = (req, res, next) => {
    const token = req.cookies.token; 

    if(!token){ 
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }else{
        try{ 
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = decoded; 
            next(); 
        }catch(error){ 
            res.status(401).json({ message: 'Access Denied. Invalid token.' }); 
        }
    }
};

export default checkAuthToken;
