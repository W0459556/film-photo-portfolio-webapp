import jwt from 'jsonwebtoken';
let secret = "Star_Trek_IV_The_One_With_The_Whales";

let token = jwt.sign({
    message: "your mom gay lol",
}, secret);

console.log(token);

jwt.verify(token, secret, (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});